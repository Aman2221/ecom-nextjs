import { type_products } from "@/interfaces/product";
import initMongoose from "@/lib/mongoose";
import { order_model } from "@/models/order";
import { product_model } from "@/models/product";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: any, res: NextApiResponse) {
    await initMongoose();
    try {
        const { street, city, email, name, productIds } = await req.json();
        console.log("productIds :", productIds)
        const slitedIds: any = new Set(productIds);
        const uniqIds = [...slitedIds];
        console.log("slitedIds :", slitedIds, "uniqIds :", uniqIds)
        const products = await product_model.find({ _id: { $in: uniqIds } }).exec();
        console.log("products :", products)
        const line_items = [];
        for (let productId of uniqIds) {
            const quantity = productIds.filter((id: string) => id === productId).length;
            const product = products.find(
                (p: type_products) => p._id.toString() === productId
            );

            line_items.push({
                quantity,
                price_data: {
                    currency: "USD",
                    product_data: { name: product.name },
                    unit_amount: product.price * 100,
                },
            });
        }
        console.log("line_items :", line_items)

        const order = await order_model.create({
            products: line_items,
            paid: 0,
            street,
            city,
            email,
            name,
        });

        console.log("order :", req.headers);
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: line_items,
                //     custom_email: email,
                success_url: `http://localhost:3000/success=true`,
                cancel_url: `http://localhost:3000/?canceled=true`,
                metadata: { orderId: order._id.toString() },
            });

            console.log("session :", session)
            console.log("url :", session.url)
            NextResponse.redirect(session.url as string);
            return NextResponse.json({ message: 'success' });
        }
        catch (e: any) {
            console.error('Error creating checkout session:', e);
            return NextResponse.json({ message: 'Internal Server Error' });
        }

    }
    catch (e: any) {
        return NextResponse.json({ message: e.message })
    }
}

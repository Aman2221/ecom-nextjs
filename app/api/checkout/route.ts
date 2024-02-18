import { type_products } from "@/interfaces/product";
import initMongoose from "@/lib/mongoose";
import { order_model } from "@/models/order";
import { product_model } from "@/models/product";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

        console.log("order :", order);
        console.log("req.headers :", req.headers, "key :", process.env.STRIPE_SECRET_KEY)
        const session = await stripe.checkout.create({
            line_items: line_items,
            mode: "payment",
            custom_email: email,
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
            metadata: { orderId: order._id.toString() },
        });
        console.log("session :", session)
        return res.redirect(session.url);
    }
    catch (e: any) {
        return NextResponse.json({ message: e.message })
    }
}

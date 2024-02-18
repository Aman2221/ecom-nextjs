import { type_products } from "@/interfaces/product";
import initMongoose from "@/lib/mongoose";
import { order_model } from "@/models/order";
import { product_model } from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await initMongoose();
    if (req.method !== "POST") {
        res.json({ message: "Method should be post" });
        return;
    }
    const { street, city, email, name } = req.body;
    const productIds = req.body.products.split(",");
    const slitedIds: any = new Set(productIds);
    const uniqIds = [...slitedIds];
    const products = await product_model.find({ _id: { $in: uniqIds } }).exec();

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

    const order = await order_model.create({
        products: line_items,
        paid: 0,
        street,
        city,
        email,
        name,
    });
    const session = await stripe.checkout.create({
        line_items: line_items,
        mode: "payment",
        custom_email: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: { orderId: order._id.toString() },
    });
    res.redirect(303, session.url);
}

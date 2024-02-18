import { product_model } from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.body.name || !req.body.url || !req.body.description || req.body.price) {
            console.log("Please fill all the data");
            res.status(400).send("can not add this product, missing fields")
        }
        else {
            const product_data = await product_model.create(req.body);
            return res.status(200).send(product_data);
        }
    }
    catch (e) {
        console.log("error :", e);
        res.status(400).send("can not add this product")
    }
}

import initMongoose from "@/lib/mongoose";
import product from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse
) {
  try {
    await initMongoose();
    console.log("ProductsModel :", product);
    const data: any = await product.find().exec();
    console.log("data :", data);
    res.status(200).json({ temp: data });
  }
  catch (e) {
    console.log("error", e)
  }
}

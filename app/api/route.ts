import initMongoose from "@/lib/mongoose";
import { product_model } from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await initMongoose();
  const url = new URL(req.url as string)
  const ids = url.searchParams.get("ids")
  if (ids) {
    const idArray = ids.split(",");
    const data: any = await product_model.find({ '_id': { $in: idArray } }).exec();
    return NextResponse.json(data);
  }
  else {
    const data: any = await product_model.find().exec();
    return NextResponse.json(data);
  }
}

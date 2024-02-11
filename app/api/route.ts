import initMongoose from "@/lib/mongoose";
import { product_model } from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await initMongoose();
  const data: any = await product_model.find().exec();
  return NextResponse.json(data);
}

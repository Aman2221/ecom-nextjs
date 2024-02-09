import initMongoose from "@/lib/mongoose";
import product from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await initMongoose();
  const data: any = await product.find().exec();
  return NextResponse.json(data);
}

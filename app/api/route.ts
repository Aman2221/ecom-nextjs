import initMongoose from "@/lib/mongoose";
import { product_model } from "@/models/product";
import { NextApiResponse, NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request | NextRequest, res: NextApiResponse) {
  await initMongoose();
  if (req.method == "POST") {
    return NextResponse.json({ message: "its a post request" });
  }
  else {
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

}

import initMongoose from "@/lib/mongoose";
import { product_model } from "@/models/product";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: any, res: NextApiResponse) {
    await initMongoose();
    const { id } = await req.json();
    try {
        if (id) {
            const res_data = await product_model.deleteOne({ _id: id });
            return NextResponse.json({ message: 'product deleted successfully' });
        }
    }
    catch (e: any) {
        return NextResponse.json({ message: e.message })
    }

}

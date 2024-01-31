import initMongoose from "@/lib/mongoose";
import Products from "@/models/product";

export default async function handle(req: Request, res: Response) {
  await initMongoose();
  const data: any = await Products.find().exec();
  console.log("data :", data);
}

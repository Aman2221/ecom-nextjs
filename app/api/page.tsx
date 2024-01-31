import initMongoose from "@/lib/mongoose";
import product from "@/models/product";

export default async function handle(req: Request, res: Response) {
  await initMongoose();
  console.log("ProductsModel :", product);
  const data: any = await product.find().exec();
}

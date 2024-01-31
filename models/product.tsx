import { Schema, model, models } from "mongoose";

const prodctSchema = new Schema({
  name: String,
  description: String,
  price: String,
  category: String,
  picture: String,
});

const Products = model("products", prodctSchema);
export default Products;

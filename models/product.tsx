let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let model = mongoose.model;
const prodctSchema = new Schema({
  name: String,
  description: String,
  price: String,
  category: String,
  url: String,
});

const product = model("product", prodctSchema);
export default product;

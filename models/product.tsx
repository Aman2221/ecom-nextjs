let mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const prodctSchema = new Schema({
  name: String,
  description: String,
  price: String,
  category: String,
  url: String,
});

export const product_model =
  mongoose.models.product || mongoose.model("product", prodctSchema); //model and models are different

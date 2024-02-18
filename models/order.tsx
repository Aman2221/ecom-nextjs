let mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const orderSchema = new Schema(
  {
    products: Object,
    street: String,
    city: String,
    email: String,
    name: String,
    paid: Number,
  },
  { timestamps: true }
);

export const order_model =
  mongoose.models.product || mongoose.model("order", orderSchema); //model and models are different

import mongoose from "mongoose";

export default async function initMongoose() {
  const CONN_URL = process.env.CONN_URL as string;
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose
    .connect(CONN_URL)
    .then(() => console.log("database connected"));
}

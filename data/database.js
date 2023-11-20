import mongoose from "mongoose";
// import { config } from "dotenv";

export const connectDb = () =>{
    mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendapi",
  })
  .then(() => console.log("Database is conected"))
  .catch((e) => {
    console.log(e);
  });
}
import mongoose from "mongoose";
// import { config } from "dotenv";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database is conected with ${c.connection.host}`))
    .catch((e) => {
      console.log(e);
    });
};

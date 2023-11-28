import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("It's Working fine");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//using error middleware
app.use(errorMiddleware);

import dotenv from "dotenv";
import express, { json } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(json({ limit: "25mb" }));

app.get("/", (req, res) => {
  res.send("Hello server");
});

//api endpoints
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

//no routes
app.use((req, res, next) => {
  next(createHttpError(400, "Endpoint not found"));
});

//general and specific errors
app.use((error, req, res) => {
  console.log(error);
  let errorMessage = "An unknown error has occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

import express, { Application, Request, Response } from "express";
import  userRoutes  from "./routes/userRoutes.js";
import { connectDB } from "./database/dbConfig.js";

const app: Application = express();

connectDB();


app.use('/api',userRoutes)

const port: number = 3500;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

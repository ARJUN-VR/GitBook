import express, { Application, Request, Response } from "express";
import  userRoutes  from "./routes/userRoutes.js";
import { connectDB } from "./database/dbConfig.js";
import cors from 'cors'

const app: Application = express();

connectDB();

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api',userRoutes)

const port: number = 3500;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./database/dbConfig.js";
const app = express();
connectDB();
app.use('/api', userRoutes);
const port = 3500;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

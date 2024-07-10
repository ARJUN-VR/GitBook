import express from "express";
import { userController } from "../controller/userController.js";
import { checkUserCache } from "../middleware/checkUserCache.js";
const userRoutes = express.Router();
const controller = userController();
userRoutes.get('/getinfo', checkUserCache, controller.fetchUserData);
export default userRoutes;

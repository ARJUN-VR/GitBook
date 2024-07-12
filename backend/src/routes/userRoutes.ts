import  express from "express"
import { userController } from "../controller/userController.js"
import { checkUserCache } from "../middleware/checkUserCache.js"

const userRoutes = express.Router()


const controller = userController()


userRoutes.get('/getinfo',checkUserCache, controller.fetchUserData )
userRoutes.patch('/softdelete', controller.softDelete)
userRoutes.get('/getfollowers',controller.getFollowers)
userRoutes.get('/getfriends',controller.getFriends)


export default userRoutes
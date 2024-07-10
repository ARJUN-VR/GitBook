var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../database/userSchema.js";
export const checkUserCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.username;
    //validate api endpoint
    if (!userName)
        return res.status(400).send({ status: false, message: 'username is required' });
    try {
        const userData = yield User.findOne({ login: userName.toUpperCase() });
        if (userData)
            return res.status(200).json({ message: 'returned from cache', data: userData });
        else
            next();
    }
    catch (error) {
        console.log(error);
    }
});

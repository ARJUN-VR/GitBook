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
import { getRepositoryDataAndSave } from "../services/fetchRepository.js";
import { Repo } from "../database/repoSchema.js";
export const userController = () => {
    //route: /api/getInfo
    //desc: get information about the give Github Url and save it in the database
    const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const username = req.query.username;
            // validating the api endpoint
            if (!username)
                return res.status(400).json({ status: false, message: "username is required" });
            const response = yield fetch(`https://api.github.com/users/${username}`);
            const data = yield response.json();
            // handle all invalid userNames
            if (data.message === "Not Found")
                return res.status(400).json({ status: false, message: "User Not Found" });
            const user = new User(data);
            yield user.save();
            const repoData = yield getRepositoryDataAndSave(user.login, user.repos_url);
            res.status(200).json({ message: 'Data fetched and saved successfully', user, repoData });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    });
    const softDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const username = req.query.username;
            const repoName = req.query.repoName;
            console.log('test', username, repoName);
            yield Repo.findOneAndUpdate({ owner: username.toUpperCase(), name: repoName }, { is_deleted: true });
            res.status(200).json({ message: 'deleted successfully' });
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        fetchUserData,
        softDelete
    };
};

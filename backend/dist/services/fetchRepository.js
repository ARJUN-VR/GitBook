var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repo } from "../database/repoSchema.js";
export const getRepositoryDataAndSave = (userName, repo_url) => __awaiter(void 0, void 0, void 0, function* () {
    const repoData = yield Repo.findOne({ owner: userName });
    if (repoData)
        return repoData;
    const repo_res = yield fetch(repo_url);
    const repo_data = yield repo_res.json();
    const savedRepos = [];
    for (const data of repo_data) {
        try {
            const repo = new Repo(data);
            repo.owner = data.owner.login;
            repo.name = data.name;
            repo.image = data.owner.avatar_url;
            repo.description = data.description;
            const savedRepo = yield repo.save();
            savedRepos.push(savedRepo);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    return savedRepos;
});

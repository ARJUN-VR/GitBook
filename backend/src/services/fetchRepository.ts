import { Repo } from "../database/repoSchema.js";


export const getRepositoryDataAndSave = async (userName:string,repo_url:string) => {


        const repoData = await Repo.findOne({owner:userName})

        if(repoData) return repoData


        const repo_res = await fetch(repo_url)
        const repo_data = await repo_res.json();

        
        const savedRepos = [];
        
        for (const data of repo_data) {
            try {
                const repo = new Repo(data);
                repo.owner = data.owner.login;
                repo.name = data.name;
                repo.image = data.owner.avatar_url;
                repo.description = data.description;
                const savedRepo = await repo.save();
                savedRepos.push(savedRepo);
            } catch (error) {
                console.error(error);
                throw error
            }
        }
        
        return savedRepos;

    }


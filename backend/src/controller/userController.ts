
import { Request, Response } from "express";
import { FriendsInterface, UserDataInterface } from "../entities.js";
import { User } from "../database/userSchema.js";
import { findFriends } from "../services/findFriends.js";
import { getRepositoryDataAndSave } from "../services/fetchRepository.js";

export const userController = () => {

    //route: /api/getInfo
    //desc: get information about the give Github Url and save it in the database
    const fetchUserData = async (req: Request, res: Response) => {
        try {

            const username = req.query.username as string

            // validating the api endpoint
            if (!username) return res.status(400).json({ status: false, message: "username is required" })

            const response = await fetch(`https://api.github.com/users/${username}`)

            const data: UserDataInterface = await response.json()

            // handle all invalid userNames
            if(data.message === "Not Found") return res.status(400).json({ status: false, message: "User Not Found" })
                
           
                const user = new User(data)
                await user.save()

                const repoData = await getRepositoryDataAndSave(user.login,user.repos_url)


                res.status(200).json({ message: 'Data fetched and saved successfully', user, repoData })


        } catch (error) {
            console.log(error)
        }

    }


    const getFollowers = async (req: Request, res: Response) => {

    }





    return {
        fetchUserData
    }
}
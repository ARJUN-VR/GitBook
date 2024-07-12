
import { Request, Response } from "express";
import { FriendsInterface, UserDataInterface } from "../entities.js";
import { User } from "../database/userSchema.js";
import { findFriends } from "../services/findFriends.js";
import { getRepositoryDataAndSave } from "../services/fetchRepository.js";
import { Repo } from "../database/repoSchema.js";
import { Followers } from "../database/followerSchema.js";
import { Friends } from "../database/friendSchema.js";

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
        try{

            const userName = req.query.userName as string

            // validating the api endpoint
            if (!userName) return res.status(400).json({ status: false, message: "userName is required" })

            const followersData = await Followers.findOne({user: new RegExp(`^${userName}$`, 'i')})

            const followers = followersData ? followersData.followers : null

            if(followers) return res.status(200).json({message: 'returned from cache', followers})

            const response = await fetch(`https://api.github.com/users/${userName}/followers`)

            const data = await response.json()

         
            //save it to usersCollection

            const followerList = []

            for(let user of data){
                const followersData = {
                    name: user.login,
                    avatar_url: user.avatar_url
                }

             followerList.push(followersData)  
            }

            const followerData = new Followers({
                user: userName.toUpperCase(),
                followers: followerList
            })

            await followerData.save()


            res.status(200).json({message: 'Data fetched and saved successfully', followers: followerData.followers})


        }catch(error){
            console.log(error)
        }

    }


    const softDelete = async (req: Request, res: Response) => {
        try {

            const username = req.query.username as string
            const repoName = req.query.repoName as string

            console.log('test',username,repoName)

            await Repo.findOneAndUpdate({ owner: new RegExp(`^${username}$`, 'i'), name:new RegExp(`^${repoName}$`, 'i') }, { is_deleted: true })

            res.status(200).json({ message: 'deleted successfully' })
            
        } catch (error) {
            console.log(error)
        }
    }


    const getFriends = async (req: Request, res: Response) => {
        try {

            const userName = req.query.userName as string

            const friendsData = await Friends.find({user: new RegExp(`^${userName}$`, 'i')})

            if(friendsData.length>0) return res.status(200).json({message: 'returned from cache', friendsList: friendsData[0].friends})

            const friendsList = await findFriends(userName)

            console.log('friendsList',friendsList)

            const modifiedData = []


            for(let user of friendsList){
                modifiedData.push({name:user.login,avatar_url:user.avatar_url})
            }


            console.log('modifiedData',modifiedData)



            
            const friendsDataSaved = new Friends({
            user:userName,
            friends:modifiedData
            })

            console.log('friendsDataSaved',friendsDataSaved)

            await friendsDataSaved.save()

            res.status(200).json({message: 'data saved succeffully', friendsList:friendsDataSaved.friends})
            
        } catch (error) {
            console.log(error)
        }
    }





    return {
        fetchUserData,
        softDelete,
        getFollowers,
        getFriends
    }
}
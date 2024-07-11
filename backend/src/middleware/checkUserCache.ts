import { Request, Response } from "express"
import { User } from "../database/userSchema.js"
import { Repo } from "../database/repoSchema.js"

export const checkUserCache = async (req: Request, res: Response, next: any) => {

    const userName = req.query.username as string
    //validate api endpoint
    if (!userName) return res.status(400).send({ status: false, message: 'username is required' })

    try {

        const userData = await User.findOne({ login: userName.toUpperCase() })
        const repoData = await Repo.find({ owner: userName.toUpperCase(), is_deleted:false })
        
        if (userData) return res.status(200).json({message:'returned from cache', user: userData , repoData})
        else next()

    } catch (error) {
        console.log(error)
    }

}
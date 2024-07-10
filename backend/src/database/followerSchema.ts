import { model, Schema } from "mongoose";


const followerSchema = new Schema({

    user:{
        type: String,
        required:true

    },
    followers:{
        type:Array,
        required:true
    }



})

export const Followers = model('followers', followerSchema)
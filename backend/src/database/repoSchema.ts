import { model, Schema } from "mongoose";

const repoSchema = new Schema({
    owner:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:"No description provided"
    },
    image:{
        type:String,
        required:true
    }
})

export const Repo = model('repo', repoSchema)
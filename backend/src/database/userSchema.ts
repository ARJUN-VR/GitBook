import { model, Schema } from "mongoose";

const userSchema = new Schema({
    login:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false,
        default:'not available'
    },
    avatar_url:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: false
    },
    bio:{
        type: String,
        required: false
    },
    repos_url:{
        type: String,
        required: true
    },
    friends:{
        type: Array,
        required:false
    }

    
})

export const User = model('User', userSchema)




import { model, Schema } from "mongoose";
const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    },
    followers_url: {
        type: String,
        required: true
    },
    following_url: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true
    },
    public_repos: {
        type: Number,
        required: true
    },
    repos_url: {
        type: String,
        required: true
    },
    public_gists: {
        type: Number,
        required: true
    },
    friends: {
        type: Array,
        required: false
    }
});
export const User = model('User', userSchema);

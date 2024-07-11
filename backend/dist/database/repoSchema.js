import { model, Schema } from "mongoose";
const repoSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "No description provided"
    },
    image: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        required: false,
        default: false
    }
});
export const Repo = model('repo', repoSchema);

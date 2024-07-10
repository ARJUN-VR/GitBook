import { model, Schema } from "mongoose";
const followingSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    following: {
        type: Array,
        required: true
    }
});
export const Following = model('following', followingSchema);

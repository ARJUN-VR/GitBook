import { model, Schema } from "mongoose";
const friendSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        required: true
    }
});
export const Friends = model('friends', friendSchema);

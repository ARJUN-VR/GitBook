import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://arjarjun2004:YXQdRmhGx06vA6fZ@clustergitbook.hycrdb0.mongodb.net/')
        console.log('Connected to MongoDB')

    } catch (error) {
        console.log(error)
    }


}
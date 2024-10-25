import mongoose from "mongoose"

let isConnected = false

export const connectToDb = async () => {
    if(isConnected) {
        console.log("MongoDb is already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true
        console.log("MongoDb is connected");
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
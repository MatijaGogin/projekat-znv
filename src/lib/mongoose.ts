import mongoose from "mongoose"

let isConnected:boolean = false;
export async function connectDB() {

    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL){
        return console.log("Problem with MongoDB connection!")
    }

    if(isConnected) {
        return console.log("Database already connected!")
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL!, {
            dbName:"projekat-znv",
        });

        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}
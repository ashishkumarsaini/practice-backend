import mongoose from 'mongoose';

export const connectDatabase = async() => {
    const MONGO_URI = process.env.MONGO_URI;

    try {
        await mongoose.connect(MONGO_URI).then(()=>{
            console.log("Database is connected!")
        }).catch(()=>{
            console.log("Failed to connect database");
        });
    } catch(error){
        console.log("Error: Failed to connect database", error);
    }
}

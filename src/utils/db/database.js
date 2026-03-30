import mongoose from 'mongoose';

// const MONGO_URI = 'mongodb+srv://vishalkyp1998_db_user:sFEcR3yZwndZcM4m@cluster0.on4k3pl.mongodb.net/?appName=Cluster0'

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

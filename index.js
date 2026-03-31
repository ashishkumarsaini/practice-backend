import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './src/utils/db/database.js';
import { authRouter } from './src/routes/auth.routes.js';

dotenv.config();

const app = express(); // creating app
app.use(express.json()); // to accept json in request

const port = process.env.PORT; // port number

// app.use -> middle ware ko bind krne ke liye
app.use("/auth", authRouter);

// app initialize krne ke liye
const initializeApp = () => {
    connectDatabase()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server is listning at port ${port}`);
        });
    })
    .catch((error)=>{
        console.log("Error: Failed to connect database", error);
    });
};

initializeApp();

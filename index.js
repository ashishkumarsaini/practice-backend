import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './src/utils/db/database.js';
import { userRouter } from './src/routes/user.routes.js';

dotenv.config();

const app = express(); // creating app
app.use(express.json()); // to accept json in request

const port = process.env.PORT; // port number

app.use("/user", userRouter);

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

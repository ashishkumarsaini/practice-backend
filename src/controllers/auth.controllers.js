import { UserModel } from "../models/user.model.js";

export const registerHandler = async (request, response) => {
    const userData = request.body; // request ki body    

    const {email, name, password, role} = userData;

    const user = await UserModel.findOne({email});

    // agr phle se koi user iss email ko use kr rha hai
    if(user){
        return response.status(409).json({
            message: "Email already exist. Please try with another email."
        })
    }

    // UserModel.create se hum new user create krenge
    const createdUser = await UserModel.create({email, name, password, role});

    if(!createdUser){
        // agr user create na ho paya toh
        return response.status(422).json({
            message: "Unable to create user."
        });
    }

    // agr user create ho gaya toh response successfully with user data
    response.status(201).json({
        message: "User is created.",
        data: {
            user: createdUser
        }
    });
};

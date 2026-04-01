import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/api/api-error.js";
import { ApiResponse } from "../utils/api/api-response.js";
import { asyncHandler } from "../utils/async-handler/async-handler.js";

export const registerHandler = asyncHandler(async (request, response) => {
    const userData = request.body; // request ki body    

    const {email, name, password, role} = userData;

    const user = await UserModel.findOne({email});

    // agr phle se koi user iss email ko use kr rha hai
    if(user){
        throw new ApiError(409, "Email already exist. Please try with another email.")
    }

    // UserModel.create se hum new user create krenge
    const createdUser = await UserModel.create({email, name, password, role});

    if(!createdUser){
        // agr user create na ho paya toh
        throw new ApiError(422, "Unable to create user.")
    }

    // agr user create ho gaya toh response successfully with user data
    response
        .status(201)
        .json(
            new ApiResponse(201, "User is created.", {user: createdUser})
        )
});

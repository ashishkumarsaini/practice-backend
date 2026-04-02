import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/api/api-error.js";
import { ApiResponse } from "../utils/api/api-response.js";
import { asyncHandler } from "../utils/async-handler/async-handler.js";

export const registerHandler = asyncHandler(async (request, response) => {
    const {email, name, password, role} = request.body; // request ki body    

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
            new ApiResponse(201, "User is created.", {user: createdUser.toJSON()})
        )
});

export const loginHandler = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    const userFound = await UserModel.findOne({email});

    if(!userFound){
        throw new ApiError(404, "Invalid email. Please try with valid email.");
    }

    const isPasswordValid = await userFound.isValidPassword(password);
    
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password. Please try with valid password.");
    }

    const accessToken = userFound.generateAccessToken();

    res
    .status(200)
    .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true
    })
    .json(
        new ApiResponse(200, "Logged in successfully.", {user: userFound.toJSON()})
    )
});

export const logoutHandler = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!user){
        throw new ApiError(401, "User not found.")
    }

    res
    .status(200)
    .clearCookie('accessToken')
    .json(new ApiResponse(200, "Logged out successfully."));
});

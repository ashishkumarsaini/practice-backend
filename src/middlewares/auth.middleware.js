import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/api/api-error.js";
import { asyncHandler } from "../utils/async-handler/async-handler.js";
import { UserModel } from '../models/user.model.js';

export const verifyJwt = asyncHandler(async (req, _res, next)=>{
    const authorizationValue = req.header('Authorization');

    const accessToken = authorizationValue.replace("Bearer ", '');

    if(!accessToken){
        throw new ApiError(401, "Access token is required.")
    }
    
    const decodeToken = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await UserModel.findById(decodeToken._id);
    
    if(!user){
        throw new ApiError(401, "Unauthorized user.");
    }

    req.user = user;
    next();
});
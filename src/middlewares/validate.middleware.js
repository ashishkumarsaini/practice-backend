import {validationResult} from 'express-validator';
import { asyncHandler } from '../utils/async-handler/async-handler.js';
import { ApiError } from '../utils/api/api-error.js';

// iss function ke through hume jo errors milegi
// use hum reponse me send krenge
export const validateMiddleware =  asyncHandler(async (req, res, next) =>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const simplifiedError = errors.array().map((error)=>{
        return {
            [error.path]: error.msg
        }
    });
    
    throw new ApiError(400, "Register Validation Error", simplifiedError);
});

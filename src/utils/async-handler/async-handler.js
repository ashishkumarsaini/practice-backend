// iss function ko hum puri app me use krenge.
// jo bhi 'mujheEkFunctionChaiye' callback function me error aayegi, usko catch krega
// aur response (res) me send krenga
export const asyncHandler = (mujheEkFunctionChaiye)=>{
    return (req, res, next) => {
        Promise
            .resolve(mujheEkFunctionChaiye(req, res, next))
            .catch((error)=> {    
                const {statusCode, message, errors, data, isSuccess} = error;

                res
                .status(statusCode)
                .json({
                    statusCode, 
                    message, 
                    errors, 
                    data,
                    isSuccess
                })
            });
    }
}
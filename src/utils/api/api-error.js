// ye ek common format hai jiske according hum client ko error send krenge
export class ApiError {
    constructor(statusCode, message, errors, data){
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = data;
        this.isSuccess = false;
    }
}

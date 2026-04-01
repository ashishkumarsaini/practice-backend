// ye ek common format hai jiske according hum client ko response send krenge
export class ApiResponse {
    constructor(statusCode, message, data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.isSuccess = true;
    }
}

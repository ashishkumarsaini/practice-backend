import mongoose from 'mongoose';
import { generateBcryptHash, comparePassword } from '../utils/bcrypt/bcrypt.js';

// format of User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: 100,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    refreshToken: {
      type: String
    }
}, {timestamps: true});

// pre hook hum tab use krte hai jab hume kuch database operation perform
// karne se pehle kuch krna hota hai
// yaha par hum save krne se pehle function ke andar password ki hashing krenge.
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        // agar password update nhi hua toh
        return next();
    } 

    const hashedPassword = await generateBcryptHash(this.password);
    
    this.password = hashedPassword;
});

// ye ek method hai jiske andar hum password ko check krenge ki wo same hai ya nhi
userSchema.method.isValidPassword = async function (providedPassword){
    return await comparePassword(this.password, providedPassword);
}

export const UserModel = mongoose.model('User', userSchema);

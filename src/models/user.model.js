import mongoose from 'mongoose';

// format of User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        trim: true,
        minlength: 1
    }
}, {timestamps: true});

export const UserModel = mongoose.model('UserModel', userSchema);

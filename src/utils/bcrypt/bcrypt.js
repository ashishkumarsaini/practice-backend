import bcrypt from 'bcrypt';

// iss function ko hum hashing krne ke liye use krenge
export const generateBcryptHash = async (data) => {
    const saltRounds = 10; // kitne bar text par hashing krni hai

    return bcrypt.hash(data, saltRounds);
}

// iss function ki hum password same hai ya nhi ye check krne ke liye use krenege
export const comparePassword = async (password, providedPassword) => {
    return bcrypt.compare(providedPassword, password);
}

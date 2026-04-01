import {body} from 'express-validator';

const nameValidator = body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(`First name should be between 2 and 100 characters.`);

const emailValidator = body('email')
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isLength({ min: 2 })
    .withMessage(`Email should be minimum 2 character.`)
    .isEmail()
    .withMessage("Incorrect email format.");

const passwordValidator = body('password')
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({min: 8, max: 20})
    .withMessage("Password should between 8 to 20 characters");

export const registerValidator = [
    nameValidator,
    emailValidator,
    passwordValidator
];

export const loginValidator = [
    emailValidator,
    passwordValidator
];

import { body , validationResult } from "express-validator";


function validate(req,res,next){
    const error = validationResult(req);
    if(error.isEmpty()){
        return next();
    }

    res.status(400).json({
        error : error.array()
    });

}


export const registerValidator = [
    body('username')
    .trim()
    .notEmpty().withMessage('Username cannot be empty')
    .isLength({min:3 , max : 20}).withMessage('Usernamwe must be between 3 to 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters , numbers and underscores'),

     
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3})
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*_]/)
    .withMessage("Password must contain at least one special character"),

    validate
]

export const loginValidator = [
    body('username')
    .trim()
    .notEmpty().withMessage('Username cannot be empty')
    .isLength({min:3 , max : 20}).withMessage('Usernamwe must be between 3 to 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters , numbers and underscores'),

     
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3})
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*_]/)
    .withMessage("Password must contain at least one special character"),

    validate
]
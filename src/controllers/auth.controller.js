import userModel from "../models/user.model.js";
import { sendMail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken';
export async function registerController(req, res, next) {
    try {
        const { email, username, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "User with this email or username already exists",
                success: false,
                error: "User already exists"
            });
        }

        const user = await userModel.create({ email, username, password });

        const emailVerificationToken = jwt.sign({
            email: user.email
        },process.env.JWT_SECRET)

        await sendMail({
            to: email,
            subject: "Welcome to our Perplexity family",
            html: `<h1>Hi ${username}</h1>
      <p>Thank you for registering!</p>
      <p>We are excited to have you on board.</p>
      <p>Please verify your email address to get started with our services.</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}" style="display:inline-block;padding:10px 20px;margin-top:20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Verify Email</a>
      <p>Best regards,<br/>The Perplexity Team</p>`
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
}

export async function verifyEmail(req, res, next) {
    const { token } = req.query;


    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await userModel.findOne({email : decoded.email});

    if(!user){  
        return res.status(400).json({
            message: "Invalid token",
            success: false,
            error: "User not found"
        })
    }

    user.verified = true;
    await user.save();

    const html = `<h1>Email Verified</h1>
    <p>Hi ${user.username},</p>
    <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>
    <p>Thank you for joining our Perplexity family!</p>
    <p>Best regards,<br/>The Perplexity Team</p>`

    res.send(html);

}

export async function loginController(req,res,next){
    const {email , password} = req.body ; 

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message  :'User not found',
            success : false,
            err : 'User not logged in'
        });
    };

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return res.status(400).json({
            message : 'Invalid password',
            success : false,
            err : 'Password is not matching with email'
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message : 'Please verify your email',
            success : false , 
            err : 'Email not verified'
        })
    }

    const token = jwt.sign({
        id : user._id , 
        username : user.username , 
        email : user.email
    },process.env.JWT_SECRET,{
        expiresIn : '7d'
    });

    res.cookie('token',token,{
        httpOnly : true,
        secure : false , 
        sameSite : 'strict'
    });

    res.status(200).json({
        message : "User logged in successfully",
        sucess : true , 
        user : {
            id : user._id , 
            username : user.username,
            email : user.email
        }
    })
}

export async function getMe(req,res,next){
    const userId = req.user.id;
    
    const user = await userModel.findById(userId).select('-password');

    if(!user){
        return res.status(404).json({
            message : 'User not found',
            success : false , 
            err : 'User not found'
        })
    }

    res.status(200).json({
        message : 'Current logged in user',
        success : true,
        user : {
            username : user.username,
            email : user.email
        }
    })
}
import 'dotenv/config';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN
    }
});

transporter.verify((error , success)=>{
    if(error){
        console.log('Error connecting to Gmail server' , error)
    }else{
        console.log('Email server is ready to send messages')
    }
});

export async function sendMail({to,subject , html, text}){
    const mailOptions = {
        from : process.env.GOOGLE_USER,
        to , subject,html ,text
    }

    const details = await transporter.sendMail(mailOptions);
}

export default transporter; 
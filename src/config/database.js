import mongoose from "mongoose";
import 'dotenv/config'

export async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MongoDB has been connected');
    })
}


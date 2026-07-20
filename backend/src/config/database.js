import mongoose from 'mongoose';
import { config } from './config.js';

const connectToDb = async () => {
    try {
        mongoose.connect(config.MONGO_URI)
            .then(() => {
                console.log('MongoDB has been connected ')
            })
    } catch (error) {
        process.exit(1);
        console.log(error);
    }
}


export default connectToDb ; 
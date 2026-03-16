import express from 'express';
const app = express();
import { connectToDb } from './config/database.js';
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';


app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRouter)


connectToDb()
.catch(()=>{
    process.exit(1)
})


export default app ;
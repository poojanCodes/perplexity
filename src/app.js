import express from 'express';
const app = express();
import { connectToDb } from './config/database.js';
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import { testAI } from './services/ai.service.js';

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRouter)

testAI()
connectToDb()
.catch(()=>{
    process.exit(1)
})


export default app ;
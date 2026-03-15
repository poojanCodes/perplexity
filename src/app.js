import express from 'express';
const app = express();
import { connectToDb } from './config/database.js';





connectToDb()
.catch(()=>{
    process.exit(1)
})


export default app ;
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDb from './config/database.js';
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));


//Database 
connectToDb();

app.get('/' , (req,res)=>{
    res.send('Api is running healthy');
})


export default app ; 
const express=require('express')
const mongodb=require('mongoose')

const morgan=require("morgan")
const dotenv=require('dotenv');
const helmet=require('helmet');
const authRoute=require('./Route/Auth')
const userRoute=require('./Route/User')
const postRoute=require('./Route/Post')
const app=express();
dotenv.config();
mongodb.connect(process.env.mongo_pass).then((err)=>{console.log("Connected successfylly")}).catch(()=>{console.log(err)})
app.use(express.json())
app.use(morgan("common"));
app.use(helmet())
app.use('/auth',authRoute);
app.use('/user',userRoute)
app.use('/post',postRoute)




app.listen(8000,()=>{
    console.log("Server is started")
})
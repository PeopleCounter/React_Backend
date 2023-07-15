import express from "express";
import connection from "./db/mongodb.mjs";
import Loginschema from "./DB_Schema/Login.mjs";
import cors from 'cors'
import crypto from 'crypto'
import session from "express-session";
import Count from "./DB_Schema/Count.mjs";
import calculate_busiest_hour from "./automation/bussiest_hour.mjs";
import CreateDocument from "./automation/startup.mjs"
import { Server } from "socket.io";

CreateDocument()

const WebSocket = new Server(4001,{
    cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
    }
})
WebSocket.on("connection",async(socket)=>{

    let date = new Date()
    let date_month = String(date.getDate())+"-"+String(date.getMonth())
    let result = await Count.findOne({date:date_month})
    console.log("Socket Connected !!");
    socket.emit("Update",{in:result.in,out:result.out})
    socket.emit("Update_FaceDetection",{teacher:result.teacher,student:result.student,unknown:result.unknown})
})


const app = express()
app.listen(3000,()=>{console.log(`App is running at port 3000`);})
app.use(cors())
app.use(express.json())
app.use(session({secret:process.env.SECRET,resave:false,saveUninitialized:true}))

//calculate_busiest_hour()


app.get('/calculate/busiest_hour',async(req,res)=>{
    let date = new Date()
    let date_month = String(date.getDate())+"-"+String(date.getMonth())
    let result = await Count.findOne({date:date_month})
    res.json({busiest_hour:result.busiest_hour})
    res.status(200)
})

app.post('/log/FaceDetection',async(req,res)=>{
    let date = new Date()
    let date_month = String(date.getDate())+"-"+String(date.getMonth())
    let student= req.body.Student
    let teacher = req.body.Teacher
    let unknown = req.body.Unknown
    
    let res_count = await Count.updateOne({date:{$eq:date_month}},{student:student,teacher:teacher,unknown:unknown})
    console.log({student:student,teacher:teacher,unknown:unknown})
    if(res_count.matchedCount>0)
    {
        WebSocket.emit("Update_FaceDetection",{student:student,teacher:teacher,unknown:unknown})
    }

    res.json({student:student,teacher:teacher,unknown:unknown})
    res.status(200)
})

app.post('/log/flow',async(req,res)=>
{
    let date = new Date()
    let date_month = String(date.getDate())+"-"+String(date.getMonth())
    let in_people = req.body.in
    let out_people = req.body.out
    let res_count = await Count.updateOne({date:{$eq:date_month}},{in:in_people,out:out_people})
    // let res_count = await Count.findOne({date:date_month})
    if(res_count.matchedCount > 0)
    {
        WebSocket.emit("Update",{in:in_people,out:out_people})
        res_count.in = in_people
        res_count.out = out_people
        console.log(res_count);
    }

    res.json({date:date_month,in:in_people,out:out_people})
    res.status(200)

})
app.post("/auth/logout",(req,res)=>
{
    console.log(req.session)
    let csrf = req.body.csrf
    if(csrf === req.session.csrf)
    {
        req.session.destroy((err)=>{console.log(err)})
    
        res.json({"message":"Logged Out"})
        res.status(200)
    }
    else
    {
        res.json({"message":"Error !!"})
        res.status(200)
    }

})



app.post("/auth/login",async(req,res)=>{
    //user_name = req.body.name
    console.log(req.body);
    const password = req.body.password
    const email = req.body.email

    console.log(email,password)

    const user = await Loginschema.findOne({Email:email})
    
   
    if(user)
    {
        if(user.Password != password)
        {
            res.json({"authenticated":false,"error":"password doesn't match !!"})
            res.status(200)
        }
        else
        {
            const csrf = crypto.randomUUID()
            const Email = user.Email 
            req.session.email = Email
            req.session.csrf = csrf
            console.log(req.session.email);
            res.json({"authenticated":true,"Name":user.Name,"Email":user.Email,"csrf":csrf})
            res.status(200)
        }
    }

    else{
        res.json({"authenticated":false,"error":"user doesn't exist !!"})
        res.status(200)
    }
    
})




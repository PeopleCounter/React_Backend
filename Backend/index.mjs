import express from "express";
import connection from "./db/mongodb.mjs";
import Loginschema from "./DB_Schema/Login.mjs";
import cors from 'cors'
import crypto from 'crypto'
import session from "express-session";
import Count from "./DB_Schema/Count.mjs";
const app = express()
app.listen(3000,()=>{console.log(`App is running at port 3000`);})
app.use(cors())
app.use(express.json())
app.use(session({secret:process.env.SECRET,resave:false,saveUninitialized:true}))


app.post('/log/flow',async(req,res)=>
{
    console.log(req);
    let date = new Date()
    let in_people = req.body.in
    let out_people = req.body.out
    let date_month = String(date.getDate())+"-"+String(date.getMonth())
    let res_count = await Count.findOne({date:date_month})
    if(res_count)
    {
        res_count.in = in_people
        res_count.out = out_people
        let update = await Count.updateOne({date:{$eq:date_month}},{in:in_people,out:out_people})
        console.log(update);
    }

    else
    {
        res_count = await Count.insertMany({date:date_month,in:in_people,out:out_people})
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
        console.log(req.session);
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




const express = require("express");
const users =require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/app-1')
.then(()=>console.log("Mongoose connected"))
.catch((err)=>console.log("Erros",err));

//schema
const userSchema = new mongoose.Schema({
    fistName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    // jobTitle:{
    //     type:String,
    // }
},{
    timestamps:true
},
);

const User = mongoose.model('user',userSchema);

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    req.myUsername="vikas"
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2",req.myUsername);
    next();
});
app.route("/users/:id").get(async(req,res)=>{
    //const id = Number(req.params.id);
    //const user = users.find((user)=>user.id===id);

    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({err:"user not found"})
    }
    return res.json(user);
}).put((req,res)=>{
    ///pending
    return res.json({status:"pending"});
}).delete((req,res)=>{
    //pending
    return res.json({status:"pending"});
});

app.get('/users',async(req,res)=>{
    const allDbUsers = await User.find({})
    res.setHeader("X-name","vikas");
    return res.json(allDbUsers);
});

app.post('/users',async(req,res)=>{
    const body=req.body;

    if(!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender){
        return res.status(400).json({msg:"All fields are requierd"})
    }
    // users.push({...body, id:users.length+1});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.json({status:"Success",id:users.length});
    // });

   const result = await User.create({
    fistName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    // jobTitle:body.jobTitle
   }); 
   console.log(result);
   return res.status(201).json({msg:"user created"});
});


app.listen(PORT,()=>console.log(`"Server Started at PORT:${PORT}"`));
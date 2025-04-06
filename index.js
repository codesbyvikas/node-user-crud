const express = require("express");
const {connectMongoDb} = require("./connection");

const userRouter = require("./routes/user")
const {logReqRes} = require("./middlewares/index")

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/app-1").then(()=>{
    console.log("Database Connected");
});
app.use(express.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 1");
//     req.myUsername="vikas"
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 2",req.myUsername);
//     next();
// });

app.use(logReqRes('log.txt'));

app.use('/users', userRouter);


app.listen(PORT,()=>console.log(`"Server Started at PORT:${PORT}"`));
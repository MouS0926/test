const express=require("express")
const {connection}=require("./db")
const { userRouter } = require("./Routes/UserRouter")
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.status(200).send("get req")
})

app.listen(8080,async ()=>{
    
    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})
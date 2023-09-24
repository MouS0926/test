const express=require("express")
const {connection}=require("./db")

const cors=require("cors")
const { UserRouter } = require("./Routes/UserRouter")


const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",UserRouter)

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
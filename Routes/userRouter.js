const express=require("express")
const { UserModel } = require("../model/UserModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const UserRouter=express.Router()

UserRouter.post("/signup",async (req,res)=>{
    
    const {username,email,password}=req.body
    try {
        let isExist=await UserModel.findOne({email})
        if(isExist)
        {
            return res.status(200).send({"msg":`User Already Registered`,email})
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(email))
        {
            return res.status(200).send({"msg":"Invalid Email"})

        }
 
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

        if(!passwordRegex.test(password))
        {
            return res.status(200).send({"msg":"Password must contain at least one letter, one number, one special character (@, $, !, %, *, ?, &)"})
        }




        bcrypt.hash(password, 4, async (err, hash)=>{
            if(err)
            {
                res.status(400).send({"err":err})
            }
            else{
                const user=new UserModel({...req.body,password:hash})
                await user.save()
                res.status(200).send({"msg":`User registered`,user})
            }
        });
        


 } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})



UserRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body

        try {
            
            const user=await UserModel.findOne({email})

            if(user){

                bcrypt.compare(password, user.password, function(err, result) {
                    if(result)
                    {
                        const token = jwt.sign({ hello: 'sarkar' }, 'moumita');
                        res.status(200).send({"msg":"Login Successful",token})
                    }
                    else{
                        res.status(200).send({"msg":"wrong password"})
                    }
                });

            }
            else{
                res.status(200).send({"msg":"wrong credential"})
            }
            



        } catch (error) {
            res.status(400).send({"err":error})
            console.log(error);
        }
})



module.exports={
    UserRouter
}
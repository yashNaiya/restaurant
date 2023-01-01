const express = require('express')
const User = require("../Models/Users")
const bcrypt = require("bcryptjs")
const Authenticate = require("../Middleware/Authenticate")
const router = express.Router()

router.post("/login",Authenticate,(req,res)=>{
    const {email,password} = req.body
   //  console.log(req.body)
    User.findOne({email:email,state:true},async (err,user) =>{
      if(user){
        const isMatch = await bcrypt.compare(password[0], user.password)
          if(isMatch){
                token = await user.generateAuthToken();

               res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 864000000),
                httpOnly:true
               }).send({message:"LogIn Sucessful",user})
          }
          else{
           //  console.log("Password Did Not Match")
          
           res.send({message:"Incorrect Credienteals"})
          }
      }else{
       //    console.log("User Not Registered")
          res.send({message:"Incorrect Credienteals"})
      }
    })
})

router.post("/register", (req,res)=>{
    console.log(req.body)

    const {name, email, password, number} = req.body

       User.findOne({email:email},(err,user)=>{
       if(user){
           res.send({message:"User Already Registered"})
       }else{
           const user = new User({
               name:name[0],
               number:number[0],
               email:email[0],
               password:password[0],
           })
           user.save(err =>{
               if(err){
                  console.log(err)
                console.log("Hello")
                     res.send(err)
               }
               else{
                   res.send({message:"Successfully Registration"})     
               }
           })
       }
    
       })
    // res.send('my register api')
})

module.exports  =router
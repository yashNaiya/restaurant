const express = require('express')
const User = require("../Models/Users")

const router = express.Router()

router.post("/login",(req,res)=>{
    const {email,password} = req.body
   //  console.log(req.body)
    User.findOne({email:email,state:true},(err,user) =>{
      if(user){
          if(password[0] === user.password){
               res.send({message:"LogIn Sucessful",user,state:1})
          }
          else{
           //  console.log("Password Did Not Match")
          
           res.send({message:"Password Did Not Match",state:0})
          }
      }else{
       //    console.log("User Not Registered")
          res.send({message:"User Not Registered",state:0})
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
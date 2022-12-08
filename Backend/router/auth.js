const express = require('express')
const User = require("../Models/Users")

const router = express.Router()



router.post("/register", (req,res)=>{
    console.log(req.body)

    const {name, email, password, number} = req.body

       User.findOne({email:email},(err,user)=>{
       if(user){
           res.send({message:"User Already registered"})
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
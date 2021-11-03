const express = require("express");
const router = express.Router();
const auth= require("../../middleware/auth");
const User = require("../../models/User");
const config= require("config");
const {check,validationResult}=require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/",auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})


//login

router.post("/",[
    check('email',"Please include a valid email").isEmail(),
    check('password',"password is Required").exists()
],async(req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}= req.body
    try {
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]})
        }        
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]})
        }
        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.send({token})
            }
        )
        //res.send("User Registerd");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
    }
    
})

module.exports= router
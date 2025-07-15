const express=require('express');
const z=require("zod");
const {User,Account} =require("../src/schema/db");
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require('../src/config');
const { json } = require('body-parser');
const { authMiddleware } = require('../src/middleware');

const signupBody=z.object({
    username:z.string(),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string()
})

const signinBody=z.object({
    username:z.string(),
    password:z.string()
})

const updateBody=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

const router=express.Router();

router.post("/signup",async(req,res)=>{
    const body=req.body;

    const {success}=signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect credentials"
        })
    }

    const existingUser= await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message:"Username already exists"
        })
    }

    const user=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    const userId=user._id;

    await Account.create({
        userId,
        balance:1 + Math.random() * 10000
    })

    const token=jwt.sign({
        userId:userId
    },JWT_SECRET);

    res.status(200).json({
        message:"User created successfully",
        token:token
    })
});

router.post("/signin",async(req,res)=>{
const {success}=signinBody.safeParse(req.body);

if(!success){
    return res.status(411).json({
        message:"Incorrect credentials"
    })
}
    
    const username=req.body.username;
    const password=req.body.password;

    const found=await User.findOne({
        username:username,
        password:password
    })

    if(!found){
        res.status(411).json({
            message:"error while logging in"
        })
    }

    const token=jwt.sign({userId:found._id},JWT_SECRET);

    res.status(200).json({
        token:token
    })
});

router.put("/update",authMiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId},req.body);

    res.status(200).json({
        message:"updated successfully"
    })

});

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";

    const users=await User.find({
        $or:[{
                firstname:{
                "$regex":filter
            }},
            {
                lastname:{
                "$regex":filter
            }}
        ]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
});

module.exports=router;
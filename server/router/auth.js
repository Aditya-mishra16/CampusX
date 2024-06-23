const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const authenticate= require("../middleware/authenticate");

require('../db/conn');
const User= require('../model/userSchema');

router.use(cookieParser());

// router.get('/',(req,res)=>{
//     res.send('Hello Im router js')
// })

//Using promises

// router.post('/register',(req,res)=>{
//     const {name, email, phone, password, cpassword}=req.body;

//     if(!name|| !email || !phone | !password || !cpassword){
//         return res.status(422).json({error:"Fild required"});
//     }

//     User.findOne({email:email}).then((userExists)=>{
//         if(userExists){
//             return res.status(422).json({error:"Email already exists"});
//         }

//         const user = new User({name, email, phone, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:'User created successfully'})
//         }).catch((err)=> res.status(500).json({error:"Account Already Exists, Failed to register"}));
//     }).catch(err=>{console.log(err);});
// });

//Using Async Await

router.post('/register',async (req,res)=>{
    const {name, email, phone, password, cpassword}=req.body;

    if(!name|| !email || !phone | !password || !cpassword){
        return res.status(422).json({error:"Fild required"});
    }
    try{
       const userExists= await User.findOne({email:email})

       if(userExists){
        return res.status(422).json({error:"Email already exists"});
    }else if(password != cpassword){
        return res.status(422).json({message:'Password not matching'})
    }else{
        const user = new User({name, email, phone, password, cpassword});
        //Saving data entered via input
        await user.save();

        res.status(201).json({message:'User created successfully'})
    }
        }catch(err){
        console.log(err);
    }
});

router.post('/signin',async(req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"Fild required"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            // console.log(isMatch);
            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error:'login error'});
            }else{
                res.json({message:'login successfull'});
            }
        }else{
            res.status(400).json({error:'login error'});
        }
        
        
    }catch(err){
        console.log(err);
    }
});

// Applying Authentication

router.get('/blogs',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/courses',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/prediction',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {
    try {
     const { name, lname, email, message } = req.body;
 
     // Check if any of the required fields are missing
     if (!name || !lname || !email || !message) {
         console.log("Error in contact");
         return res.status(400).json({ error: "Please fill all fields in the contact form" });
     }
 
     // Find the user based on the userID obtained from authentication
     const userContact = await User.findOne({ _id: req.userID });
 
     // If user is found, add the message
     if (userContact) {
         await userContact.addMessage(name, lname, email, message);
         await userContact.save();
 
         return res.status(200).json({ message: "User contact information saved successfully" });
     } else {
         return res.status(404).json({ error: "User not found" });
     }
    } catch(error) {
     console.log(error);
     return res.status(500).json({ error: "Internal server error" });
    }
 });

 router.get('/logout',(req,res)=>{
    console.log("Im logout");
    res.clearCookie('jwtoken',{path:'/'})
    res.send("user Logout");
});


// router.get('/',authenticate,(req,res)=>{
//     console.log('hello my home');
//     res.send(req.rootUser);
// });

module.exports = router;
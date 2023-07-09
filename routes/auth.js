const router=require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt')

router.post('/register',async(req,res)=>{
    try{
        const salt= await bcrypt.genSalt(10)
        const hand= await bcrypt.hash(req.body.password,salt)
        const newuser=new user({
            username:req.body.username,
            email:req.body.email,
            password:hand
        })
        const user1=await newuser.save()
        res.status(200).json(user1)
    }
   catch(err){
    console.log(err)
    res.status(500).json(err)
   }
    
})

router.post('/login',async(req,res)=>{
    try{
        const givenuser= await user.findOne({username:req.body.username})
        console.log(givenuser)
        !user && res.status(400).json('wrong')
        const validated=await bcrypt.compare(req.body.password,givenuser.password)
        !validated && res.status(400).json('wrong')
        const {password,...others}=givenuser._doc;
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }

})

module.exports=router

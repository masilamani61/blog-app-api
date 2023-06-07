const router=require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt')
const post=require('../models/post')
const categories=require('../models/categories')

router.post('/',async(req,res)=>{
    const newcat=new categories(
        req.body
    )
    try{
        const savedcat=await newcat.save()
        res.json(savedcat)
    }
    catch(err){
        res.status(500).json(err)
    }

})

router.get('/',async(req,res)=>{
   
    
    try{
        const cat=await categories.find(req.body)
        res.json(cat)
    }
    catch(err){
        res.status(500).json(err)
    }

})

module.exports=router
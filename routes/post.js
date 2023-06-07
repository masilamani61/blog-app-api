const router=require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt')
const post=require('../models/post')

//create

router.post('/',async(req,res)=>{
    const newpost= await new post(req.body)
    try{
        const savedpost=await newpost.save()
        res.status(200).json(savedpost)

    }
    catch(err){
        res.status(500).json(err)
    }
})

//update

router.put('/:id',async(req,res)=>{
    try{
    const Post=await post.findById(req.params.id)
    if (Post.username===req.body.username){
        try{
        const updatedpost= await post.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true})
        res.status(200).json(updatedpost)
        }
        catch(err){
            res.status(400).json(err)
        }
    }
    else{
        res.status(500).json(err)
    }
}
    catch(err){
        res.status(500).json(err)
    }
})


router.delete('/:id',async(req,res)=>{
    try{
    const Post=await post.findById(req.params.id)
    if (Post.username===req.body.username){
        try{
            await post.findByIdAndDelete(req.params.id)
            res.status(200).json('deleted')
        }
        catch(err){
            res.status(400).json(err)
        }
    }
    else{
        res.status(500).json(err)
    }
}
    catch(err){
        res.status(500).json(err)
    }
})


router.put('/:id',async(req,res)=>{
    try{
    const Post=await post.findById(req.params.id)
    if (Post.username===req.body.username){
        try{
        const updatedpost= await post.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true})
        res.status(200).json(updatedpost)
        }
        catch(err){
            res.status(400).json(err)
        }
    }
    else{
        res.status(500).json(err)
    }
}
    catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id',async(req,res)=>{
    try{
    const Post=await post.findById(req.params.id)
    res.status(200).json(Post)
    
}
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/',async(req,res)=>{
    const username=req.query.user;
    const catname=req.query.cat;
    try{
        let posts;
        if (username){
            posts=await post.find({username:username})
        }
        else if (catname){
            posts =await post.find({categories:{
                $in:[catname]
            }})
        }
        else{
            posts=await post.find()
        }
        res.status(200).json(posts)

    }
    catch(err){
        res.status(500).json(err)
    }
})




module.exports=router
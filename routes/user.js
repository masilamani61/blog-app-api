const router=require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt')
const post=require('../models/post')

router.put('/:id',async(req,res)=>{
   console.log('c')
    if (req.body.id===req.params.id){
        console.log('s')
        if (req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updateduser=await user.findByIdAndUpdate(req.body.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updateduser)
        }
        catch(err){
            res.status(400).json(err)
        }
    }
    else{
        res.json('account not matched')
    }
})

router.delete('/:id',async(req,res)=>{
   
    if (req.body.id===req.params.id){
      
        
        try{
            const users=await user.findById(req.body.id);
            await post.deleteMany({username:users.username})
             await user.findByIdAndDelete(req.body.id)
             res.status(200).json("deleted")
        }
        catch(err){
            res.status(400).json(err)
        }
    }
    else{
        res.json('there is no account matche')
    }
})

router.get('/:id',async(req,res)=>{
    if (req.body.id===req.params.id){
        const users=await user.findById(req.body.id)
        res.status(200).json(users)
    }
    else{
        res.json('not matched')
    }
})
    




   
    


module.exports=router
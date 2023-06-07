const express=require('express');
const mongoose=require('mongoose')
const multer=require('multer')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')
const auth=require('./routes/auth')
const update=require('./routes/user')
const path=require('path')
const post=require('./routes/post')
const categories=require('./routes/categories')
dotenv.config()

app.use("/images",express.static(path.join(__dirname,'/images')))

app.use(
    cors({
        origin:'https://blog-app-o0wb.onrender.com/', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
    
    )
  );

mongoose.connect(process.env.mongourl).then(()=>{
   console.log('connected')
}
).catch((err)=>{
    console.log(err)
}) 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload =multer({storage:storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('file is uploaded')
})

app.use(express.json())
app.use('/api/auth',auth)
app.use('/api/update',update)
app.use('/api/post',post)
app.use('/api/categories',categories)

app.listen(5000,console.log('server started'))

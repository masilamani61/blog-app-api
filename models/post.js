const mongoose=require('mongoose');

const postschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        default:""
    },
    username:{
        type:String,
    },
    categories:{
        type:Array,
    
    }
    
    
},{timestamps:true})

module.exports=mongoose.model('post',postschema)
const mongoose=require('mongoose');

const categoriesschema= new mongoose.Schema({
    
    name:{
        type:String,
        default:''
    }
   
    
},{timestamps:true})

module.exports=mongoose.model('categories',categoriesschema)
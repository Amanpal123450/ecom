const mongoose = require("mongoose");

const ProductrSchema= new mongoose.Schema({
   
      name:{
        type:String,
        required:true,
      },
      description:{
        type:String,
        
      },
    
      price:{
        type:String,
        required:true,
      },
    stock:{
        type:Number,
        default:0,
      },
      imageUrl:{ 
        
       type: String
      } // Store image URL
})
 
const Product=mongoose.model("Product",ProductrSchema);

module.exports=Product;
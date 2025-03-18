const mongoose = require("mongoose");

const OrderSchema=new mongoose.Schema({
   
     user:{type:mongoose.Schema.Types.ObjectId,ref: "User", required: true},

     product:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},

        quantity: { type: Number, required: true },
     }],

     totalAmount:{
        type:Number,
        required:true,
     },
     status:{
        type:String,
        default:"Processing",
     }
})
 
const Order=mongoose.model("order",OrderSchema);

module.exports=Order;
const mongoose =require("mongoose");

const WistListSchema= new mongoose.Schema({

      userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
      },
      products :[
        {
             productId:{
                type:mongoose.Types.ObjectId,
                ref:"Product",
                require:true,
             },
             addedAt:{
                type:Date,
                default: Date.now,
             }
        },
      ]
})

module.exports = mongoose.model("Wishlist",WistListSchema);
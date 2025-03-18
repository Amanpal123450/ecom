const Wishlist =require("../model/wishListSchema");
const Product =require("../model/productSchema");


async function addToWishlist(req, res) {
    try {
      const { userId } = req.user;
      const { productId } = req.body;
  
      console.log("product_llllllll", productId);
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Find the user's wishlist
      let wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ userId, products: [] });
      }
  
      // Check if product is already in wishlist
      const productInWishlist = wishlist.products.some(
        (item) => item.productId.toString() === productId
      );
  
      if (productInWishlist) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
  
      // Add product to wishlist
      wishlist.products.push({ productId });
      await wishlist.save();
  
      res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
async function getWishlist (req,res) {
        
 try {

    const  {userId} =req.user;
   
    if (!userId) {
         return res.status(400).json({msg:"token not avalible"});
    }

    const getWishlist = await Wishlist.findOne({userId}).populate("products.productId");

    if (!getWishlist) {
        
        return res.status(400).json({msg:"Wishlist is empty"});
    }
    
    res.status(200).json(getWishlist);
    
 } catch (error) {
      
    res.status(500).json({ message: error.message });
 }

   
}

async function removerWishlist(req,res) {

    try {

    const {userId} =req.user;
    const {productId}=req.body;
   

    let wishlist = await Wishlist.findOne({userId});

    if(!wishlist){

        return res.status(400).json({msg:"WishList not founde"});
    }

    wishlist.products=wishlist.products.filter((item)=>item.productId.toString() !== productId);
     
    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist", wishlist });
        
    } catch (error) {
          
        res.status(500).json({ message: error.message });
    }

    
    
}
async function clearWishlist(req,res) {

    try {
        const {userId}=req.user;

    let wishlist = await Wishlist.findOne({userId});

    if (!wishlist) {
         
        return res.status(400).json({msg:"wishList not found"});
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({ message: "Wishlist cleared" });
    
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
}
module.exports={
    addToWishlist,
    getWishlist,
    removerWishlist,
    clearWishlist,
}

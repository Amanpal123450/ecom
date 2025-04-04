const Cart =require("../model/cartSchema");
const Product=require("../model/productSchema")

async function addCart(req, res) {
    try {
        console.log("Request received at /addCart");  // Log when request starts
        console.log("req.user:", req.user);  // Log user info

        const { userId } = req.user;
        if (!userId) {
           
            return res.status(400).json({ msg: "User ID not found in token" });
        }

        const { productId, quantity } = req.body;
        console.log("Product ID:", productId, "Quantity:", quantity);

        const product = await Product.findById(productId);
         if (!product) {
          
            return res.status(404).json({ msg: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, item: [], totalPrice: 0 });
        }


        const existingItem = cart.item.find((e) => e.productId.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += Number(quantity);
        } else {
            cart.item.push({ productId, quantity, price: product.price });
        }

        cart.totalPrice = cart.item.reduce((acc, item) => acc + item.quantity * item.price, 0);
        cart.updatedAt = new Date();

        await cart.save();

        console.log("Cart updated successfully!"); // Log success

        return res.status(200).json(cart);
    } catch (error) {

        console.error("Error in addCart:", error.message); // Log error
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}

async function getCart(req, res) {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const cart = await Cart.findOne({ userId }).populate("item.productId");

        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}

 async function removeitem(req, res) {
    try {
        const { userId } = req.user;
        const { productId } = req.body;

       
        const cart = await Cart.findOne({ userId });

        console.log(userId);

        if (!cart) {
            return res.status(400).json({ msg: "Cart not found" });
        }

     
        cart.item = cart.item.filter((e) => e.productId.toString() !== productId);

        // Fix incorrect reference to `e`
        cart.totalPrice = cart.item.reduce((acc, item) => acc + item.quantity * item.price, 0);

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ msg: "Error", error });
    }
}
const updateCartItem = async (req, res) => {
    try {

      const {userId} = req.user;
      const { productId, quantity } = req.body;
      const cart = await Cart.findOne({userId});
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const items = cart.item.find((item) => item.productId.toString() === productId.toString());

      if (!items) return res.status(404).json({ message: "Item not found in cart" });
  
      items.quantity = quantity;
      cart.totalPrice = cart.item.reduce((acc, item) => acc + item.quantity * item.price, 0);
      cart.updatedAt = new Date();
  
      await cart.save();
      res.status(200).json(cart);

    } catch (error) {

      res.status(500).json({ message: error.message });

    }
  };

  async function clearCart(req,res) {
  try {

    const {userId}=req.user;

    const cart = await Cart.findOne({userId});

    if(!cart)
    {
        return res.status(404).json({msg:"cart not found"});
    }
    cart.item=[];
    cart.totalPrice=0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared seccessfuly" });
    
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
   
  }

module.exports={
    addCart,
    getCart,
    removeitem,
    updateCartItem,
    clearCart,
}

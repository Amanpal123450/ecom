const Order = require("../model/order");
const Product = require("../model/productSchema");

const createOrder = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging log

    const { userId } = req.user;
    const { products, totalAmount, address } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User not found in request" });
    }

    // Validate address fields
    if (!address || !address.phoneNumber || !address.postalCode || !address.state || !address.city || !address.street) {
      return res.status(400).json({ success: false, message: "Complete address is required" });
    }

    // Validate products array
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products array is required" });
    }

    // Ensure each product has required fields
    for (const product of products) {
      if (!product.productId || !product.name || !product.quantity || !product.price || !product.imageUrl) {
        console.log("Invalid Product:", product); // Log invalid product
        return res.status(400).json({ 
          success: false, 
          message: `Each product must have productId, name, quantity, price, and imageUrl. Missing fields in product: ${JSON.stringify(product)}` 
        });
      }
    }

    // Format products correctly
    const formattedProducts = products.map((item) => ({
      productId: item.productId,
      name: item.name, // Ensure name is included
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.imageUrl
    }));

    // Create the order
    const order = new Order({
      user: userId,
      products: formattedProducts,
      totalAmount,
      orderNumber: `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      address,
    });

    await order.save();
    res.status(201).json({ success: true, order });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

   async function getAllOrder(req,res) {
       
    try {
          
      const order = await Order.find()
      
       if (!order) {

        return res.status(400).json({msg:"order not found"});
        
       }
       res.status(200).json({ success: true, order });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

   }



module.exports = {
  createOrder,
  getAllOrder
};

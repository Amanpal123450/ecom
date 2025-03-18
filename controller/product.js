const Product =require("../model/productSchema");
const Multer =require("multer");


async function CreatProduct(req,res) {

    try {
        const { name, price, description, stock, gender } = req.body;
        
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
    
        const imageUrl = `/uploads/${req.file.filename}`;
    
        const newProduct = new Product({
          name,
          price,
          description,
          stock,
          gender,
          imageUrl,
        });
    
        await newProduct.save();
    
        return res.status(201).json({ msg: "Product created successfully", newProduct });
      } catch (error) {
        return res.status(400).json({ msg: "Error", error });
      }
}

async function getAllProduct(req,res) {

try {

    const allProduct= await Product.find();
  
    return res.status(200).json({allProduct});
    
} catch (error) {

    return res.status(400).json({ message: error.message});
}
    
    
}

async function getProductById(req,res) {

    try {

        const {id}=req.params;

        const ProductById= await Product.findOne({_id:id})
        if (!ProductById) {
            return res.status(400).json({ msg:"product not found"});
        }

        return res.status(200).json(ProductById);
        
    } catch (error) {
        
        return res.status(400).json({msg:"erroe",error})
    }
}

async function UploadFile(req,res) {

    if(!req.file) return res.status(400).json({msg:"file not found"})
        

    
}

async function searchbra(req,res) {

    try {
        const { query } = req.query;
        if (!query || query.trim() === "") {
            return res.status(400).json({ msg: "Search query is required" });
        }

        // Case-insensitive search
        const products = await Product.find({
            name: { $regex: new RegExp(query, "i") },
        });
       return  res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
    
}

module.exports={
    CreatProduct,
    getAllProduct,
    getProductById,
    searchbra,

}
import Product from "../models/product.model.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    //if allProducts length is zero
    if(!allProducts){
        return res.status(404).json({success: false, message: "No product found!"});
    }

    res.status(200).json({
      success: true,
      message: "Fetched list of all products",
      data: allProducts,
    });
  } catch (err) {
    console.error("Error in fetching all products", `Error is : ${err}`);

    if(err.name === "MongoNetworkError"){
        console.error("DB connnection error");
        return res.status(503).json({success: false, message: "Interval Server Error"});
    }

    res.status(500).json({ success: false, message: "Internal server error, Please try again later." });
  }
}

export const addOneProduct = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product)
      return res.status(400).json({
        success: false,
        message: "Invalid request, try again with product data",
      });

    const newProduct = new Product({ ...product });
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Product is added successfully.",
        data: savedProduct,
      });
  } catch (err) {
    console.error("Error in adding a product ", err);

    if(err.name === "MongoNetworkError") console.error("DB connection error");
    else if(err.name === "ValidationError") console.error("Client's data doesn't fit with product schema");


    res.status(500).json({
      success: false,
      message: "Internal server error. Unable to add the product. Try again later.",
    });
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product id is required" });

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({success: false, message: "No product exist with this id"});
    }

    res
      .status(200)
      .json({ success: true, message: "Found the product", data: product });
  } catch (err) {
    console.error("Error in getting one product from DB ", err);
    if(err.name === "CastError") console.error("Product id is not in correct format");
    else if(err.name === "MongoNetworkError") console.error("DB connection Error");

    res
      .status(500)
      .json({ success: false, message: "Something went wrong. Please try again later" });
  }
}

export const updateProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        const {newProduct} = req.body;
        if(!productId || !newProduct) return res.status(400).json({success: false, message: "product Id and product details are required"});

        const theProduct = await Product.findByIdAndUpdate(productId, {...newProduct}, {new: true});

        // if there was no product with this id then theProduct will be null
        if(!theProduct)
            return res.status(404).json({success: false, message: "This product doesn't exist"});
        
        res.status(201).json({success: true, message: "Product is updated successfully", data: theProduct});
    }catch(err){
        console.error("Error in updating a product ", err);

        if(err.name === "CastError") console.error("Product id is not in correct format");
        else if(err.name === "ValidationError") console.error("Product data doesn't fit with product schema");
        else if(err.name === "MongoNetworkError") console.error("DB connection error");

        res.status(500).json({success: false, message: "Internal server error. Please try again later"});
    }
}

export const deleteProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        if(!productId) return res.status(400).json({success: false, message: "productId is required"});

        const deletedProduct = await Product.findByIdAndDelete(productId);

        //if deletedProduct is null
        if(!deletedProduct)
            return res.status(404).json({success: false, message: "This product doesn't exist anymore, Might be already deleted."});

        res.status(200).json({success: true, message: "The product is deleted successfully", data: deletedProduct});

    }catch(err){
        console.error("Error in deleting a product ", err);

        if(err.name === "CastError") console.error("The product id is not in correct format");
        else if(err.name === "MongoNetworkError") console.error("DB connection error");

        res.status(500).json({success: false, message: "Internal server errror. Try again later"});
    }
}
import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch(error){
        console.log("Error in fetching products");
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const postProducts = async (req, res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const prodExist = await Product.findOne({name: product.name});
    
    if(prodExist){
        console.error("Product Already Exist!");
        res.status(500).json({success: false, message: "Server Error"});
    }
    else{
        try{
            const newProduct = new Product(product);
            await newProduct.save();
            res.status(201).json({success:true, data: newProduct});
            console.log("Create Successfully!");
        }
        catch(error){
            console.error("Error in creating product: ", error.message);
            res.status(500).json({success: false, message: "Server Error"});
        }
    }
}

export const deleteProducts = async (req, res) => {
    const {id} = req.params;
    console.log("id: ", id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message: "Invalid Product ID"});
    }

    try{
        const product = await Product.findById(id);

        if(product){
            console.error("Product Deleted");
            await Product.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Product Deleted"});
        }
        else{
            console.log("Product not found")
            res.status(404).json({success: false, message: "Product not found"});
        }
    }
    catch(error){
        res.status(404).json({success: false, message: "Product not found"});
    }
}

export const putProducts = async (req, res) =>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message: "Server Invalid Product ID"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success:true, data: updatedProduct});
    }
    catch(error){
        console.log(error);
        res.status(404).json({success:false, message: "Server Error!"});
    }

}
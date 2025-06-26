import foodModel from '../models/foodModels.js';
import fs from 'fs'
export const addFood = async (req, res) => {
  try {
    const image_filename = `${req.file.filename}`; // Proper use of template literal

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.status(201).json({ success: true, message: 'Food item added successfully', food });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add food item', error: error.message });
  }
};
export const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success: false, message: 'Failed to list food item', error: error.message})
    }
}

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Remove image from uploads folder
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
      }
    });

    // Delete food document from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
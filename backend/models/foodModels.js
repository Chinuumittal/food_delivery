// it is used for the schema of our database like structure 

import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name :{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}

})
const foodModel= mongoose.models.food || mongoose.model("food",foodSchema)// if model already there then it will use if not then create
export default foodModel;
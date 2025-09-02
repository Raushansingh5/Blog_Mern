import mongoose, { Schema } from "mongoose";

const catSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    blog:[{
        type:Schema.Types.ObjectId, ref:"Blog"
    }]
},{timestamps:true})

const Category= mongoose.model("Category",catSchema);
export default Category;
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

//create schema 
const reviewSchema = new Schema({
    comment : String,
    rating :{
        type : Number,
        min : 1,
        max : 5
    },
    CreatedAt :{
        type : Date,
        default : Date.now()
    },
    author :{
        type : Schema.Types.ObjectId,
        ref:"User"
    },
})

//create model 

const Review = mongoose.model("Review",reviewSchema);

module.exports=Review;
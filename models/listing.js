const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const Review =require("./review.js");
const { number, required } = require("joi");

//create schema
const listingSchema =new Schema({
    title: {
      type :String,
      require: true,
    },
    description: String,
    image: {
        url:String,
        fileName :String,
      },
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"
      }
    ],
    owner :{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    geometry: {
      type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // Must be [lng, lat]
      required: true
    },
  },
  category:{
      type:[String],
      enum:['Trending','Rooms','Iconic Cities','Mountains','Castles','Amazings Pools','Camping','Farms','Arctic','Domes','Boats'],
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in :listing.reviews }});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports=Listing;
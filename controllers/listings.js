const Listing=require("../models/listing.js");

module.exports.index = async(req, res)=>{
    let allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewform = (req,res)=>{
    res.render("listings/new");   
};

module.exports.createlisting=async(req, res,next)=>{
    let mapToken=process.env.GOOGLE_MAP_TOKEN;
    //get location cordinates
    let location =req.body.listing.location;
    async function geocodeAddress() {
      const address = location;
      const apiKey = mapToken; // Replace with your real API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            return data.results[0].geometry.location;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    }
    const coordinates=await geocodeAddress();
    if (!coordinates) {
        req.flash("error", "Invalid location!");
        return res.redirect("/listings/new");
    }
    //Convert to GeoJSON format
    const { lat, lng } = coordinates;
    const geoCoordinates = {
        type: "Point",
        coordinates: [lng, lat]
    };
    let url=req.file.path;
    let fileName=req.file.filename;
    const newListing= new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,fileName};
    newListing.geometry=geoCoordinates;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.showlisting =async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path :"reviews" , populate:{path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs" ,{listing});
    }  
}

module.exports.editlisting =async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path :"reviews" , populate:{path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs" ,{listing});
    }  
}

module.exports.updateListing =async(req,res)=>{
    let mapToken=process.env.GOOGLE_MAP_TOKEN;
    //get location cordinates
    let location =req.body.listing.location;
    async function geocodeAddress() {
      const address = location;
      const apiKey = mapToken; // Replace with your real API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            return data.results[0].geometry.location;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    }
    const {id}=req.params;
    const coordinates=await geocodeAddress();
    if (!coordinates) {
        req.flash("error", "Invalid location!");
        return res.redirect(`/listings/${id}`);
    }
    //Convert to GeoJSON format
    const { lat, lng } = coordinates;
    const geoCoordinates = {
        type: "Point",
        coordinates: [lng, lat]
    };
    let data=req.body.listing;
    console.log(data);
    data.geometry=geoCoordinates;
    let listing =await Listing.findByIdAndUpdate(id, data);
    if(req.file){
        let url=req.file.path;
        let fileName=req.file.filename;
        listing.image={url,fileName};
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`); 
}

module.exports.destroyListing =async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
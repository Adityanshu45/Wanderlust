const Listing=require("../models/listing.js");

module.exports.categoryListings=async(req,res)=>{
    let category=req.body.category;
    let allListings= await Listing.find({});
    if(allListings.length<1){
        req.flash("success","No listings found in this location yet. We're constantly growing—check back soon");
        return res.redirect("/listings");
    };
    res.render("listings/category.ejs",{allListings,category});
};

module.exports.searchListings=async(req,res)=>{
    let search=req.query.search;
    let allListings= await Listing.find({location :search});
    if(allListings.length<1){
        req.flash("success","No listings found in this location yet. We're constantly growing—check back soon");
        return res.redirect("/listings");
    };
    res.render("listings/index.ejs",{allListings});
};

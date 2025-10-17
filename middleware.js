const Listing=require("./models/listing.js");
const {listingSchema}=require("./validateSchema.js");
const ExpressError=require("./utils/ExpressError.js");
const {reviewSchema}=require("./validateSchema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;;
        req.flash("error" , "Please login frist");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    res.locals.redirectUrl = req.session.redirectUrl;
    next();
};

module.exports.isOwner = async(req, res, next)=>{
    const {id}=req.params;
    let listing=await Listing.findById(id);
    if(!res.locals.currUser._id.equals(listing.owner._id)){
        req.flash("error", "You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el) => el.message).join(",")
        throw new ExpressError(404,errMsg);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el) => el.message).join(",")
        throw new ExpressError(404,errMsg);
    }
    else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next)=>{
    const {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash("error", "You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const multer = require("multer");

// catch Multer errors manually
function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.error("💥 Multer error:", err.message);
    return res.status(400).send("File upload error: " + err.message);
  } else if (err) {
    console.error("💥 Unknown error in upload:", err);
    return res.status(500).send("Unknown error occurred during upload.");
  }
  next();
}
module.exports.multerErrorHandler = multerErrorHandler;
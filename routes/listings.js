const express =require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing, multerErrorHandler} = require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

//index and create
router.route("/")
    .get( wrapAsync (listingController.index))
    .post(upload.single("listing[image]") ,  validateListing, wrapAsync( listingController.createlisting ));

// New routes
router.get("/new",isLoggedIn,listingController.renderNewform );


//show update and delete route
router.route("/:id")
    .get( wrapAsync ( listingController.showlisting ))
    .put( isLoggedIn , isOwner , upload.single("listing[image]") ,multerErrorHandler , validateListing , wrapAsync (listingController.updateListing))   
    .delete( isLoggedIn , isOwner , wrapAsync (listingController.destroyListing));

// Edit routes
router.get("/:id/edit", isLoggedIn , isOwner , wrapAsync (listingController.editlisting));

module.exports=router;
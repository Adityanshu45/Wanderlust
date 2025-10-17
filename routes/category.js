const express =require("express");
const router = express.Router();

const listingController = require("../controllers/category.js");


router.post("/category",listingController.categoryListings);
router.get("/search",listingController.searchListings);

module.exports=router;
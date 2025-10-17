const express =require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersControllers = require("../controllers/users.js");

//signup
router.route("/signup")
    .get( usersControllers.renderSignupform )
    .post( wrapAsync ( usersControllers.registerSignup ));


//login
router.route("/login")
    .get( usersControllers.renderLoginForm )
    .post( saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true }), usersControllers.submitLogin );

//logout
router.get('/logout', usersControllers.logOut);

module.exports =router;
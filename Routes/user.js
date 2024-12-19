const  express  =require("express");
 const router =express.Router();
const user=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport")
const{saveRedirecrUrl}=require("../middleware")
const UserController=require("../controller/user")
// const LocalStrategy= require("passport-local").Strategy;

// const listing =require(".  ./models/listing.js")

router.get("/signup",UserController.renderSignupPage)

router.post("/signup", wrapAsync(UserController.savingSignupdata))

router.get("/login",UserController.renderingLoginForm);

router.post("/login",
    saveRedirecrUrl,
    passport.authenticate("local", {
        // successRedirect: "/listings",
        failureRedirect: "/login",
        failureFlash: true,
    }),
  UserController.login
);


router.get("/logout",UserController.logout)


module.exports=router
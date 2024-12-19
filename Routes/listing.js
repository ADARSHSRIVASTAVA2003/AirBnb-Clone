const  express  =require("express");
 const router =express.Router();
 const listing =require("../models/listing.js")
 const wrapAsync=require("../utils/wrapAsync.js")
 const { listingSchema,reviewSchema } = require("../schema.js");
 const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn}=require("../middleware.js")
const {isOwner,validatingListing}=require("../middleware.js")
const  listingcontroller=require("../controller/listings.js")
const multer =require('multer')
const {storage}=require("../cloudConfig.js")
const upload =multer({storage})
// require("../views/listing/new.ejs")
 
// index  routes
 
router.get("/",wrapAsync(listingcontroller.index));

//   new  Routes form
router.get("/new",isLoggedIn,(listingcontroller.rendernewform));

  //show  routes
router.get("/:id", wrapAsync(listingcontroller.showlisting))
 
 // create routrs
 router.post("/",isLoggedIn,upload.single("listings[image]"),wrapAsync(listingcontroller.createlisting))
// router.post("/" ,upload.single('listing[image]'),validatingListing,isLoggedIn, wrapAsync(listingcontroller.createlisting)) ;
// router.post("/" ,upload.single('listings[image]'),(req,res)=>{
//  wra
// }) ;

// edit routes
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingcontroller.renderEditform));
 
//  update routes
router.put("/:id",isLoggedIn,isOwner,upload.single("listings[image]"),validatingListing, wrapAsync(listingcontroller.updatelisting))

 //  Delete routes
router.delete("/:id",isLoggedIn,isOwner, listingcontroller.deletelisting);



  module.exports=router 
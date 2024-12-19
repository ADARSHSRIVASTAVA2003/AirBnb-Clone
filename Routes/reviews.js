const  express  =require("express");
 const router =express.Router({mergeParams:true});
 const wrapAsync=require("../utils/wrapAsync.js")
 const ExpressError=require("../utils/ExpressError.js");
//  const { listingSchema,reviewSchema } = require("../schema.js");
 const Listing = require("../models/listing.js");
 const Review = require("../models/review.js");
 const {validatingreview,isLoggedIn,isOwner,isReviewauthor}=require("../middleware.js")
const  ReviewController=require("../controller/reviews.js")



//  validate  function

 
 

// review post
router.post("/", isLoggedIn,validatingreview,wrapAsync(ReviewController.createReview));


//  / Delete the review routes
router.delete("/:reviewId",isLoggedIn,isReviewauthor,wrapAsync(ReviewController.deleteReview))


module.exports=router;
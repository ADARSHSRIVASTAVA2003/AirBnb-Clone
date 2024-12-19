const listing =require("./models/listing.js")
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn=(req,res,next)=>{
  // console.log(req.path,",,",req.originalUrl )
    if(! req.isAuthenticated()){
      // redirect 
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be looged in to create Listing")
        return res.redirect("/login");
      }
      next();
}   
module.exports.saveRedirecrUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
  res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner=async(req,res,next)=>{
  let {id}= req.params;
  let  listings =await listing.findById(id);
  if(!listings.owner.equals(res.locals.currentUser._id)){
    req.flash("error","you are  not  the  owner  of  listing");
     return res.redirect(`/listings/${id}`)

  }
  next();
}

module.exports.validatingListing=(res,req,next)=>{
  let{error}=listingSchema.validate(req.body);
  if(error){
     let errMsg=error.details.map((el)=>el.mesaage).join(",")
     throw new ExpressError(400,errMsg);
  }else{
     next();
  }

};


module.exports.validatingreview=(res,req,next)=>{
  let{error}=reviewSchema.validate(req.body);
  if(error){
     let errMsg=error.details.map((el)=>el.mesaage).join(",")
     throw new ExpressError(400,errMsg);
  }else{
     next();
  }

};


module.exports.isReviewauthor=async(req,res,next)=>{
  let {id,reviewId}= req.params;
  let  review =await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currentUser._id)){
    req.flash("error","you are  not  the  author of  the  review");
     return res.redirect(`/listings/${id}`)

  }
  next();
}
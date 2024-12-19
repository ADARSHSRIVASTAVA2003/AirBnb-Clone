const listing =require("../models/listing.js")


module.exports.index=async (req,res)=>{
    console.log("chexk" )
     const  listings= await listing.find({}) 
   res.render("../views/listing/index.ejs",{listings})
  }



 module.exports.rendernewform=(req,res)=>{  
    console.log("hiinew")
   res.render("../views/listing/new.ejs")
  }


  module.exports.showlisting=async(req,res,next)=>{
  let {id}=req.params;
  console.log(id);  

 const  listings= await listing.findById(id).populate({
  path:"reviews",
  populate:{
    path:"author"
  }
 })
 .populate("owner");
if(!listing){
  req.flash("error","listing you requested for  does not exist")
  redirect("/listings")
}
console.log(listings)
   res.render("../views/listing/show.ejs",{listings})
 }


module.exports.createlisting= async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.path.filename;
  console.log(url,"  ",filename)
    let listings=req.body.listings;
    const newlisting=new listing(listings)
    newlisting.image={url,filename};
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("success","New Listing added")
    res.redirect("/listings")
 }

module.exports.renderEditform=async(req,res)=>{
    let {id}=req.params;
    const  listings= await listing.findById(id);
    
    if(!listings){
      req.flash("error","listing you requested for  does not exist")
      redirect("/listing")  
    } 

    let originalImageUrl=listings.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250");

    res.render("./listing/edit.ejs",{listings,originalImageUrl});
 
}

module.exports.updatelisting=async (req,res)=>{
    let {id}= req.params;
     const Listing=await listing.findByIdAndUpdate(id,{...req.body.listings})
     
     if(typeof req.file!=="undefined"){
      let url=req.file.path;
      let filename=req.path.filename;
      Listing.image={url,filename};
      await Listing.save();
     }
     console.log(listing)
      req.flash("success","listing updated")
  res.redirect(`/listings/${id}`)
// res.render("../views/listing/show.ejs",{listings})
}



module.exports.deletelisting=async (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
      const deleted = await listing.findByIdAndDelete(id);
      console.log(deleted);
      if (deleted) {
        req.flash("sucess","listing Deleted!")
        res.redirect("/listings")
        // res.status(200).json({ message: 'Listing deleted successfully' });
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

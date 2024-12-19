const mongoose =require("mongoose");
const  Schema  =mongoose.Schema;


const  listingSchema =new Schema({
    title:{
      type:  String,
    required :true,
},
   
    description:{
        type:String,
    required:true
    },
    // price:String,
    image:{
        // ----------mow
        filename: String,
        url: String,
    
//         type:String,
//         default:":https//unsplash.com/photos/a-view-of-a-mountain-with-trees-in-the-foreground-BLnwfr90Cm4",
// Set:(v)=>
// v===""
// ? "https://unsplash.com/photos/a-view-of-a-mountain-with-trees-in-the-foreground-BLnwfr90Cm4"
// :v     
    },
    price:{
        type:Number,
        required:true
    },


    location:{   
     type:String,
     required:true
        },

    country:{
        type:String,
        required:true
    }  ,
    // reviews:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Review",
    //     // default: []
    // }]
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
    

});


const listing = mongoose.model("listing",listingSchema);
 
module.exports =listing;







   

const Listing =mongoose.model("Listing",listingSchema);
module.exports=   Listing;
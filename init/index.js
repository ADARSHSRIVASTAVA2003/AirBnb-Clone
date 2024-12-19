const mongoose =require("mongoose"); 
const listing =require("../models/listing.js")
const initdata =require("./data.js");
const  methodOverride=require("method-override")
// const Listing =require("./models/listing.js")


 main()
 .then(()=>{
    console.log("conecctd to dbs");

 })
 .catch((err)=>{ 
    console.log(err);
 });

 async function main (){
  await  mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

 }


 const initDB=async () => {
    await  listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
      ...obj,
      owner:"66ed3fae8dcb6651ec58d84b"
    }))
    await listing.insertMany(initdata.data);
   
  
    console.log("data was initialise");

 };
  initDB();
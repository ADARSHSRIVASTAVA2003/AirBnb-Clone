 if(process.env.NODE_ENV !="production"){
 require('dotenv').config();}

// console.log(process.env.SECERET) 
 
 const  express  =require("express");
 const  app =express();
 const mongoose =require  ("mongoose"); 
 const path=require("path");
const  methodOverride=require("method-override")
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const  userRouter=require("./Routes/user.js")
const session = require("express-session");
const flash=require("connect-flash")
const passport=require("passport");
const LocalStrategy= require("passport-local").Strategy;
const User=require("./models/user.js")

const  listingsRouter=require("./Routes/listing.js")
const  reviewsRouter=require("./Routes/reviews.js")
const cokkieParser=require("cookie-parser");

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

//  app.set('view engine', 'ejs'); // Replace 'ejs' with your preferred template engine (e.g., 'pug', 'handlebars', etc.)
app.engine("ejs",ejsMate)
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,"views"))
 app.use(express.urlencoded({extended:true}))
 app.use (express.static( path.join(__dirname,"/public")))
 app.use(methodOverride("_method"))
 



 const sessionOptions={
   secret:"mysuperseceretstring",
   resave:false,
   saveUninitialized:true,
   // cookie:{
   //    expires:Date.now +7*24*60*60*100,
   //    maxAge:60*60*24*3,
   //    httpOnly:true,
   // }
  
}
app.use(session(sessionOptions))
app.use(cokkieParser());
// session middlieware
app.use(flash())
// passport congiguration
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

  
//  app.get("/",(req,res)=>{
//     res.send("hi i am root"); 
// })
app.use((req,res,next)=>{
   res.locals.currentUser=req.user;
res.locals.success=req.flash("success");
res.locals.error =req.flash("error");
next();
})

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews/",reviewsRouter)
app.use("/",userRouter)

 app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"page not found "))
 })

app.use((err,req,res,next)=>{
   let{statusCode=500,message="hello"}=err;
   // res.send("something went wrong")
   // res.status(statusCode).send(message);
      res.render("error.ejs",{err})
})
 
// // Control Panel\Hardware and Sound\Power Options\System Settings

 app.listen(8000,()=>{
     console.log("server is  starting");

 })
 

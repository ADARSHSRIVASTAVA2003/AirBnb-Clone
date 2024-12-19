const user=require("../models/user");


module.exports.renderSignupPage=(req,res)=>{
    res.render("user/signup.ejs");
}


module.exports.savingSignupdata=(async (req,res)=>{
    try{
        let {username,email,password}=req.body
        const newUser=   new user({email,username});
        const registereduser=await user.register(newUser,password)
        console.log(registereduser)
        req.login(registereduser,( err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome  to wonderlust")
            res.redirect("/listings")
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
   
})

module.exports.login= async(req,res) => {

    console.log(req.body);
       console.log("login route")
 req.flash  ("success", "Welcome back to Wonderlust")
 let redirectUrl =res.locals.redirectUrl|| "/listings"
 res.redirect(redirectUrl)
    } 


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
    if(err){
         return   next(err);
    }
    req.flash("success","you are logged out")
    res.redirect("/listings")
    }
)
}

module.exports.renderingLoginForm=(req,res)=>{
    res.render("user/login.ejs")
}
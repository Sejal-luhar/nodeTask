const express=require("express")
const router=express.Router();
const indexSchema=require("../models/indexSchema")
const {isLoggedIn}=require("../middlewares/user.auth")

const passport=require("passport")
const passlocal=require("passport-local")
passport.use(new passlocal(indexSchema.authenticate()))
router.get("/signup",(req,res)=>{
    res.render("signup",{title:"User Autghentication | signup",
        user:req.user
    })
})
router.post("/signup",async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        await indexSchema.register({username,email},password);
        res.redirect("/user/signin");
    } catch (error) {
        next(error)
    }
})
router.get("/signin",async(req,res)=>{
   try {
    res.render("signin",{title:"authenticaion | signin",
        user:req.user
    })
   } catch (error) {
    next(error)
   }
})
router.post("/signin",
    passport.authenticate("local",{
    successRedirect:"/user/profile",
    failureRedirect:"/user/signin"
}),
(req,res)=>{})

router.get("/profile",isLoggedIn,async(req,res)=>{
 try {
    res.render("profile",{title:"profile page",
        user:req.user
      })
 } catch (error) {
    next(error)
 }
})
router.get("/signout",isLoggedIn,async(req,res)=>{
 req.logOut(()=>{
    res.redirect("/user/signin")
 })
})
module.exports=router;
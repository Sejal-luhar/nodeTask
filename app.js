require("dotenv").config({path:"./.env"})
const express=require("express");
const app=express();
const indexRouter=require("./routes/index.routes")
const userRouter=require("./routes/user.routes")
const path=require("path")
const passport = require("passport");
const session=require("express-session");
const IndexSchema = require("./models/indexSchema");

require("./config/db")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret:process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(IndexSchema.serializeUser());
passport.deserializeUser(IndexSchema.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/",indexRouter)
app.use("/user",userRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server isrunning on ${process.env.PORT}`);
    
})
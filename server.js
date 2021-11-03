const express= require("express");
const connectDB = require("./config/db")
const app=express();
const path = require('path')

connectDB();
app.use(express.json({extended:false}));//include this line to access req.body else we cant access



app.use("/api/users",require("./routes/api/users"));
app.use("/api/auth",require("./routes/api/auth"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/posts",require("./routes/api/posts"));

//serve static assets in production
if(process.env.NODE_ENV==='production')
{
    //set static folder
    app.use(express.static("devconnectorclient/build"));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'devconnectorclient','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))
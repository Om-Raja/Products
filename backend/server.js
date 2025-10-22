import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToDB from "./config/db.js";


const app = express();

app.get("/", (req, res)=>{
    res.json({success: true, message: "You are live"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    connectToDB();
    console.log("App is listening at port", PORT);
})
const express = require("express");
const mongoose = require("mongoose");

//Routers
const userRouter = require("./router/userRouter");
const hataRouter = require("./router/404Router");
const dbConnect = require('./db/dbConnect');



var app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/users", userRouter);
app.use(hataRouter)








app.listen(8080);
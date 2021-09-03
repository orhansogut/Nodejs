const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/restfulApi', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, }, (error) => {
    if (!error) {
        console.log("connected")
    } else {
        console.log("error")
    }
})

// const {Client} = require('pg')

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "recep458",
//     database: "deneme"
// })

// client.connect();
// client.query('Select * from sds',(error, result) =>{
//     if(!error){
//         console.log("connected")
//         console.log(result.rows)
//     }
//     else{
//         console.log("error")
//     }
//     client.end();
// })


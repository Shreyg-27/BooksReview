const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require ('cors');
app.use (express.json());
app.use (cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

const db = 'mongodb+srv://ganjoo:shreyaganjoo@cluster0.2ngtf0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const userRoute = require("./Routes/auth");
const postRoute = require("./Routes/post");





app.use(express.json());
const PORT = 5000;


mongoose.connect(db).
    then(() => {
        console.log("connected sucessfully");
        app.listen(5000, (err)=> {
            if(err) console.log(err);
            console.log(`running successfully at ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("error", error);
});

app.use(userRoute);
app.use(postRoute);





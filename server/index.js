const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.port || 8000;

const db = require('./config/mongoose');

// db();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(express.json({ extended: false }));
app.use(cors());
app.use("/", require("./routes/index"));

app.listen(port, function(err){
    if(err){
        console.log(`Error occured while running the server at ${port}`);
    }
    console.log(`Yup! Successfully running server on ${port}`);
});
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

let arr = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

fs.readFile("./File/storage.json",(err, data) => {
    if(!err)
    {
        arr = JSON.parse(data);
        
    }
});

app.get("/",(req,res)=>{
    res.render("index.ejs",{arr});
});
app.post("/submit",(req,res)=>{
    arr.push(req.body["fname"]);
    fs.writeFile("./File/storage.json",JSON.stringify(arr),(err)=>{
        if(err)
        {
            console.error("Error writing data to file:",err);
        }
    });

    res.render("index.ejs",{arr});
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
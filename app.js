const express = require('express');
const https = require('https');
const request = require('request');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const JokeAPI = require('sv443-joke-api');
// const axios = require("axios");

const app = express();
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})


app.post("/",function(req,res){
  let query = req.body.jokeType;
  query = query.trim();
  const url = "https://v2.jokeapi.dev/joke/"+query;
  const categories = ['Programming','programming','Dark','dark','Spooky','spooky','Pun','pun'];

  if(categories.includes(query)){

  https.get(url, function(response){
    console.log(response.statusCode);
    let link = "https://giphy.com/embed/";
    let linkGif;
    response.on("data",function(data){
      const responseData = JSON.parse(data);
      //responseData.category = responseData.category.trim();
      if(responseData.category === "Programming" || responseData.category === "programming"){
        linkGif = link+"hyyV7pnbE0FqLNBAzs";
      }else if(responseData.category === "Dark" || responseData.category === "dark"){
        linkGif = link+"l0amJzVHIAfl7jMDos";
      }else if(responseData.category === "Pun" || responseData.category === "pun"){
        linkGif = link+"ynRrAHj5SWAu8RA002";
      }else if(responseData.category === "Spooky" || responseData.category === "spooky"){
        linkGif = link+"tkApIfibjeWt1ufWwj";
      }
      if(responseData.type === "twopart"){
        
        res.render("joke",{jokeInput:responseData.setup+", "+responseData.delivery, gif:linkGif});
      }else{
        
        res.render("joke",{jokeInput: responseData.joke, gif:linkGif});
      }
    
    })
  })
}else{
  res.send("<h1>Error, please try again!</h1>");
}
})


app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server running on port 3000");
})

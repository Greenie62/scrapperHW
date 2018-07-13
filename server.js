var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongojs=require('mongojs');
var path=require("path");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 2999;

// Initialize Express
var app = express();



// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//the connection(which i dont feel ive gotten to work and has been crux
// of any hope of progress with the rest. : ( ))
mongoose.connect("mongodb://localhost/Climbs")


app.get('/',(req,res)=>{
    res.send("<h1>hello there asshole! </h1>");
})

//IDEALLY!!
//the route to capture the scraped for data and then insert it into the DB
// it seemed?? to work on the console level(mongo IDs assigned),
//but could never find where they were going. Mongo mixup!!
app.get('/scrape',function(req,res){
    axios.get('https://www.mountainproject.com').then(function(response){
        var $=cheerio.load(response.data)
        $(".route-row").each(function(i,element){
            var results={};
            results.link=$(this).children().children('a').attr('href');
            results.name=$(this).children().children('a').text();
           results.location=$(this).children().children().children().children().text();
        
           console.log(results);
      
        db.Climbs.create({name:"justin",fromNode:"to mongo"}).then(function(dbClimbs){
           console.log(dbClimbs)
       })
       .catch(function(err){
           console.log(err)
       })  
    })


        res.send("scrape was a success, we hope.")
    
});
})

//perform a find query to pull the articles(data) back out of database and send to html pathway
//format accordingly.
app.get("/getData",(req,res)=>{
    db.Climbs.find({},function(data){
        console.log("got data " + data);
        res.send(data);
    })
})

// main html page
app.get('/index.html',(req,res)=>{
    res.send(path.join(__dirname, "index.html"))
})

// a remove query based upon the ID value of whatever buttons was clicked(each 
// rendered row will have its own button with a unique(increment) value)
app.post('/removeNote',(req,res)=>{
    var removeNote=req.body.id;
    db.Climbs.remove({id:removeNote},function(){
        console.log("note was removed!")
    })
    res.end();
})

//a insert performed for when user submits note
app.post('/getNote',(req,res)=>{
    var newNote=req.body;
    db.Notes.insert(note).then(function(dbNote){
        console.log(dbNote)
    }).catch(function(err){
        return res.json(err)
})
res.send('note was added!')
})

app.listen(PORT,()=>console.log("logged on!"));
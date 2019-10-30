const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser'); //to use post request
const cors = require('cors');
const mongoose = require ('mongoose'); // add for mongoDB (lab8)        (10)

//add the following bellow for (lab8) (10)
const mongoDB = 'mongodb+srv://admin:admin@cluster0-t58dy.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true}); //connect to the database using this parser

//----------------------------------------------------------------------------------------------
//need to input code below to allow cross talk : CORS
//must run command (npm install cors)
//----------------------------------------------------------------------------------------------

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});
//-------------------------------------------------------------------------------------------------

// to start install (npm install express) 
// node ServiceWorkerRegistration.js in terminal below to run code*

//NEEDED FOR POST REQUEST BELOW:(parses the body of the html to pass to another page)

// parse application/x-www-forum-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
//parse application/json
app.use(bodyParser.json())
//---------------------------------------------------------------------------------------------------
//(10) creating a FOLDER for your DATABASE to store into
    //AKA WRITING DATA

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
})

const MovieModel = mongoose.model('movie',movieSchema) //creates a folder called movie that links movieschema/documents to it



//---------------------------------------------------------------------------------------------------
//(1)SENDS BACK A BASIC HELLO WORLD RESPONSE
app.get('/', (req, res) => res.send('Hello World!'))
//---------------------------------------------------------------------------------------------------
//(2)SENDS BACK A BASIC HELLO RESPONSE WHEN ACCESS PAGE 2
app.get('/differenturl', (req, res) => res.send('Hello from page 2!'))

//---------------------------------------------------------------------------------------------------
//(3)RETURNING THE URL IN THE PAGE AND IN CONSOLE WHEN RUN
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send('Hello ' + req.params.name)
})
//---------------------------------------------------------------------------------------------------
//(4)TO RETURN A HTML PAGE USING PAGE NAME 
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})
//---------------------------------------------------------------------------------------------------
//(10)
// http://localhost:4000/api/movies/5db96045f733220998a9b621  <-- the long code got from the mongoDB site which is from  the created movie from client in collections
app.get('/api/movies/:id', (req,res) => {

console.log(req.params.id);

MovieModel.findById(req.params.id,(error,data)=>{
    res.json(data);

    })
})




//---------------------------------------------------------------------------------------------------
//(10)
//READING FROM MONGODB

app.get('/api/movies', (req, res) => {

    MovieModel.find((error,data)=>{

        res.json({movies:data}) //now calling the data to have an array called movies in json 
    })



})
   /*//(5)SENDS BACK A RESPONSE OF MOVIE JSON DATA 
        const myMovies = 
        [
        {
        "Title":"Avengers: Infinity War",
        "Year":"2018",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
        "Title":"Captain America: Civil War",
        "Year":"2016",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        }
        ]

        res.status(200).json({movies:myMovies,message:'operation completed sucessfully!'})
          */  
        
//---------------------------------------------------------------------------------------------------
//(9) sending data up from the create.js page to the server.
//(10) need this for code below to create up to mongoDB
//AKA WRITING DATA

app.post('/api/movies',(req,res) => {
    console.log('Movie Recieved');
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);


//(10) allows the data to be created which gets passed up to mongoDB
MovieModel.create({
    title: req.body.title,
    year: req.body.year,
    poster: req.body.poster,
});
})
//---------------------------------------------------------------------------------------------------
//(6)RETURNING THE URL IN THE PAGE AND THE NAME INPUTTED TO FORUM USING (GET REQUEST!)
    app.get('/name', (req, res) => {
        console.log(req.query.fname) //outputs to console terminal below (fname)
        console.log(req.query.lname) //outputs to console terminal below (lname)
    res.send('working GET REQUEST ' + req.query.fname + ' ' + req.query.lname ); //displays to website screen 
    })
    
//---------------------------------------------------------------------------------------------------
//(7)RETURNING THE URL IN THE PAGE USING A (POST REQUEST!) - to use post (npm install body-parser)
app.post('/name', (req, res) => {
    console.log(req.body.fname) //outputs to console terminal below (fname)
    console.log(req.body.lname) //outputs to console terminal below (lname)
res.send('working POST REQUEST  ' + req.body.fname + ' ' + req.body.lname ); //displays to website screen 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser'); //to use post request

//----------------------------------------------------------------------------------------------
//need to input code below to allow cross talk : CORS
//must run command (npm install cors)
//----------------------------------------------------------------------------------------------
const cors = require('cors');
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
//(5)SENDS BACK A RESPONSE OF MOVIE JSON DATA
app.get('/api/movies', (req, res) => {
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
            
        })
//---------------------------------------------------------------------------------------------------
//(9) sending data up from the create.js page to the server.

app.post('/api/movies',(req,res) => {
    console.log('Movie Recieved');
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
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
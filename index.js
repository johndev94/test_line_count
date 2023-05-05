
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var model = require('./model/model');

var app = express(); 
app.use(cors());
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/login/:user?pass?", function(req,res){
	model.getLogin(req,res,{user:req.params.user, pass:req.params.pass});
  
});

app.get("/login", function(req,res){
	model.getLogin2(req,res);
  
});

app.get("/users", function(req,res){
	model.getLogin2(req,res);
  
});

app.get("/movies", function(req,res){
	model.getMovies(req,res);
  
});

app.get("/reviews", function(req,res){
	model.getReviews(req,res);
});

app.get("/reviews/:id?", function(req,res){
	model.getMovieReviews(req,res);
});

app.get("/screenings", function(req,res){
	model.getScreenings(req,res);
  
});

app.get("/screeningsMovies", function(req,res){
	model.getScreeningMovies(req,res);
  
});

app.get("/screenings/:id?", function(req,res){
	model.getScreening(req,res);
  
});

app.get("/screeningsWithRuntime", function(req,res){
	model.getScreeningsWithTime(req,res);
  
});

app.get("/screeningsData/:id?", function(req,res){
	model.getScreenings2(req,res);
  
});

app.get("/bookings", function(req,res){
	model.getBookings(req,res);
  
});

app.get("/seatsSold", function(req,res){
	model.getSeatsSold(req,res);
  
});

app.get("/nowShowing/:date?", function(req,res){
	model.getNowShowing(req,res);
  
});

app.post("/register", function(req,res){
  console.log(req.body);
  model.register(req,res);
});

//SCREENINGS
app.post("/screenings/add", function(req,res){
    console.log(req.body);
    model.addScreening(req,res);
});

app.post("/screenings/update", function(req,res){
  console.log(req.body);
  model.updateScreening(req,res);
});

app.post("/screenings/delete", function(req,res){
  console.log(req.body);
  model.deleteScreening(req,res);
});

//REVIEWS
app.post("/reviews/add", function(req,res){
  console.log(req.body);
  model.addReview(req,res);
});

//MOVIES
app.post("/movies/add", function(req,res){
  console.log(req.body);
  model.addMovie(req,res);
});

app.post("/movies/update", function(req,res){
console.log(req.body);
model.updateMovie(req,res);
});

app.post("/movies/delete", function(req,res){
console.log(req.body);
model.deleteMovie(req,res);
});

//USERS
app.post("/users/add", function(req,res){
  console.log(req.body);
  model.addUser(req,res);
});

app.post("/users/update", function(req,res){
console.log(req.body);
model.updateUser(req,res);
});

app.post("/users/delete", function(req,res){
console.log(req.body);
model.deleteUser(req,res);
});

//BOOKINGS

app.post("/bookings/add", function(req,res){
  console.log(req.body);
  model.addBooking(req,res);
});

app.post("/bookings/delete", function(req,res){
  console.log(req.body);
  model.deleteBooking(req,res);
  });

 app.get("/movieDetails/:id?", function(req,res){
  console.log(req.params.id);
 	model.movieDetails(req,res);
});

app.get("/booking/:id?", function(req,res){
  console.log(req.params.id);
 	model.booking(req,res);
});

var myServer = app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
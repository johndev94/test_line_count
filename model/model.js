var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cinemasol',
  port: 3306
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database cinemasol`);
});

exports.getLogin = function(req,res,user,pass){

	connection.query("select * FROM	users", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getLogin2 = function(req,res){

	connection.query("select * FROM	users", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.register = function(req,res){

	connection.query(`INSERT INTO users (email, password, type)
    VALUES ('${req.body.email}', '${req.body.password}', '${req.body.type}')`);
	res.sendStatus(202);
	
}

exports.getReviews = function(req,res){

	connection.query("select * FROM	reviews", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getMovieReviews = function(req,res){

	connection.query(`select * FROM	reviews WHERE film_id = ${req.params.id}`, function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getMovies = function(req,res){

	connection.query("select * FROM	films", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}


exports.getBookings = function(req,res){

	connection.query("select * FROM	bookings", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getScreenings = function(req,res){

	connection.query("select * FROM	screenings", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getScreening = function(req,res){

	connection.query(`select films.*, screenings.filmID AS 'film_id', screenings.costPerSeat AS 'cost', screenings.capacity, screenings.seatsBooked FROM films, screenings WHERE screenings.ID = ${req.params.id} AND screenings.filmID = films.ID`, function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getScreeningMovies = function(req,res){

	connection.query("select * FROM screenings,films,bookings WHERE films.ID = filmID AND screenings.ID = bookings.screeningID", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getScreenings2 = function(req,res){

	connection.query(`select films.*, screenings.date, screenings.time, screenings.ID AS 'screeningID', screenings.filmID AS 'film_id' FROM films, screenings WHERE films.ID = ${req.params.id} AND screenings.filmID = films.ID`, function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getScreeningsWithTime = function(req,res){

	connection.query("select screenings.*, films.runtime AS 'runtime' FROM	screenings,films WHERE films.ID = filmID", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}


exports.getNowShowing = function(req,res){
	var date = req.params.date;
	date = date.replace(/-/g, '/');
	console.log(date);

	connection.query(`select films.*, screenings.date as 'Date', screenings.time as 'Time', screenings.costPerSeat as 'cost', screenings.ScreenID as 'screenNum', screenings.ID as 'screeningID' FROM films, screenings WHERE films.ID = screenings.filmID ` + 
	`AND Date ='${date}' ORDER by Date, Time`, function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

exports.getUsers = function(req,res){

	connection.query("select * FROM	users", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}
//REVIEWS
exports.addReview = function(req,res){
	console.log(req.body);
	connection.query(`INSERT INTO reviews (reviewer_name, review_text, rating, review_date, film_id)
    VALUES ('${req.body.name}', '${req.body.description}', '${req.body.rating}', '${req.body.date}', ${req.body.filmID})`);
	res.sendStatus(202);
}

//BOOKINGS

exports.deleteBooking = function(req,res){

	connection.query(`DELETE FROM bookings WHERE screeningID = ${req.body.screening_id}`);
	res.sendStatus(202);
}


//SCREENINGS
exports.addScreening = function(req,res){

	connection.query(`INSERT INTO screenings (ScreenID, capacity, time, date, costPerSeat, filmID, seatsBooked)
    VALUES (${req.body.screenNo}, ${req.body.capacity}, '${req.body.time}', '${req.body.date}', ${req.body.costPerSeat}, ${req.body.film_id}, ${req.body.seats_booked})`);
	res.sendStatus(202);
}

exports.updateScreening = function(req,res){

	connection.query(`UPDATE screenings SET ScreenID = ${req.body.screenNo}, capacity = ${req.body.capacity}, time = '${req.body.time}', date = '${req.body.date}',
	costPerSeat = ${req.body.cost_per_seat}, filmID = ${req.body.film_id}, seatsBooked = ${req.body.seats_booked} WHERE ID = ${req.body.screening_id}`);
	res.sendStatus(202);
}

exports.deleteScreening = function(req,res){

	connection.query(`DELETE FROM screenings WHERE ID = ${req.body.screening_id}`);
	res.sendStatus(202);
}

//MOVIES
exports.addMovie = function(req,res){

	connection.query(`INSERT INTO films (runtime, filmName, ageRating, description, trailer)
    VALUES ('${req.body.runtime}', '${req.body.filmName}', '${req.body.ageRating}', '${req.body.description}', '${req.body.trailer}')`);
	res.sendStatus(202);
}

exports.updateMovie = function(req,res){

	connection.query(`UPDATE films SET runtime = '${req.body.runtime}', filmName = '${req.body.filmName}', ageRating = '${req.body.ageRating}',
	description = '${req.body.description}', trailer = '${req.body.trailer}' WHERE ID = ${req.body.filmID}`);//may need to fix
	res.sendStatus(202);
}

exports.deleteMovie = function(req,res){

	connection.query(`DELETE FROM films WHERE ID = ${req.body.film_id}`);
	res.sendStatus(202);
}

//USERS
exports.addUser = function(req,res){

	connection.query(`INSERT INTO users (email, password, type)
    VALUES ('${req.body.email}', '${req.body.password}', '${req.body.type}')`);
	res.sendStatus(202);
}

exports.updateUser = function(req,res){

	connection.query(`UPDATE users SET email = '${req.body.email}', password = '${req.body.password}', type = '${req.body.type}'
	WHERE ID = ${req.body.userID}`);
	res.sendStatus(202);
}

exports.deleteUser = function(req,res){

	connection.query(`DELETE FROM users WHERE ID = ${req.body.userID}`);
	res.sendStatus(202);
}


exports.movieDetails = function(req,res){
	console.log(req.params.id);
	connection.query(`SELECT * FROM films WHERE ID = ${req.params.id}`, function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	});
}

//USERS
exports.addUser = function(req,res){

	connection.query(`INSERT INTO users (email, password, type)
    VALUES ('${req.body.email}', '${req.body.password}', '${req.body.type}')`);
	res.sendStatus(202);
}

exports.updateUser = function(req,res){

	connection.query(`UPDATE users SET email = '${req.body.email}', password = '${req.body.password}', type = '${req.body.type}'
	WHERE ID = ${req.body.userID}`);
	res.sendStatus(202);
}

exports.deleteUser = function(req,res){

	connection.query(`DELETE FROM users WHERE ID = ${req.body.userID}`);
	res.sendStatus(202);
}


//BOOKINGS
exports.addBooking = function(req,res){

		const numTickets = parseInt(req.body.tickets);
		const screeningID = req.body.screeningID;
		const customerID = req.body.customerID;
		const cost = req.body.cost;
	  
		connection.query(`SELECT seatsBooked FROM screenings WHERE ID=${screeningID}`, function(err, result) {
		  if (err) {
			console.error(err);
			res.sendStatus(500);
			return;
		  }
	  
		  const seatsBooked = result[0].seatsBooked;
		  console.log(seatsBooked);
		  console.log(numTickets);
	  
		  
		  var newSeatsBooked = seatsBooked + numTickets;
		  console.log(newSeatsBooked);
	  
		  
		  connection.query(`UPDATE screenings SET seatsBooked=${newSeatsBooked} WHERE ID=${screeningID}`, function(err, result) {
			if (err) {
			  console.error(err);
			  res.sendStatus(500);
			  return;
			}
	  
			
			connection.query(`INSERT INTO bookings (numTickets, screeningID, customerID, cost) VALUES (${numTickets}, ${screeningID}, ${customerID}, ${cost})`, function(err, result) {
			  if (err) {
				console.error(err);
				res.sendStatus(500);
				return;
			  }
	  
			  res.sendStatus(202);
			});
		  });
		});
}


exports.getSeatsSold = function(req,res){

	connection.query("SELECT bookings.filmID, bookings.numTickets FROM bookings", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	});
	
}





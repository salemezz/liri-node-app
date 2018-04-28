require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var yargs = require('yargs');
var keys = require('./keys.js');
var fs = require("fs");


var client = new Twitter(keys.twitter);

var command = yargs.argv._[0];
var nodeArgs = yargs.argv._;;
//Words in songName
var songName = "";

for (var i = 1; i < nodeArgs.length; i++) {

  if (i > 1 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
  }
  else {
    songName += nodeArgs[i];
  }
}
//Words in movieName
var movieName = "";

for (var i = 1; i < nodeArgs.length; i++) {

  if (i > 1 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
//
if (command === "my-tweets") {
  client.get('statuses/user_timeline', { screen_name: "sal_ezz1" }, function (error, tweets, response) {
    if (error) throw error;

    for (i = 0; i < tweets.length; i++) {
      console.log("\x1b[44m\x1b[31m", "-------------------------------------------------------------");
      console.log(tweets[i].text, "\x1b[0m");  // The favorites. 
    }
  });
}
var spotify = function () {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\x1b[42m\x1b[30m", "-------------------------------------------------------------");
    console.log("Track Name: "+ data.tracks.items[0].name);
    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
    console.log("-------------------------------------------------------------", "\x1b[0m");
  });
}
if (command === "spotify-this-song") {
  spotify();
}

if (movieName === "") {
  movieName = "Mr. Nobody";
}

if (command === "movie-this") {
  // console.log("Entry: " + movieName);

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log("\x1b[43m\x1b[30m", "-------------------------------------------------------------");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatos: " + JSON.parse(body).Ratings[1].Value);
      console.log("Production Country: " + JSON.parse(body).Country);
      console.log("Original Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("-------------------------------------------------------------", "\x1b[0m");
    }
  });
}
if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    var output = data.split(",");
    songName = output[Math.floor(Math.random() * output.length)];
    spotify();
  });
}

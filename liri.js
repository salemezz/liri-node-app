require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var yargs = require('yargs');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = yargs.argv._[0];

if (command === "my-tweets") {
    client.get('statuses/user_timeline', {screen_name:"sal_ezz1"}, function(error, tweets, response) {
        if(error) throw error;
        
        for (i = 0; i < tweets.length; i++) { 
            console.log(tweets[i].text);  // The favorites. 
        }
      });
}

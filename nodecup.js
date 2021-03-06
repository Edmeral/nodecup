#!/usr/bin/env node

var request = require('request');
var colors = require('colors');
var moment = require('moment');

var SCREEN_WIDTH = 68;
var whitespace = '      '; // I choose this to center the content in a terminal resolution width of 80 character

function printProgress(ratio) {

  var position = Math.floor(SCREEN_WIDTH * ratio);

  var past = '';
  var remaining = '';

  for (var i = 0; i < position; i++)
    past += '-';

  if (position < SCREEN_WIDTH - 1 && position != 0) {
    past += 'o';
    for (var i = position + 1; i < SCREEN_WIDTH; i++) // I use position + 1 so not to exceed 68 characters (SCREEN_WIDTH)
      remaining += '-';
  } else {
    for (var i = position; i < SCREEN_WIDTH; i++)
      remaining += '-';
  }

  console.log(whitespace + past.green.bold + remaining.bold);
}

console.log(''); // Some white space is good for the health

var arg = process.argv[2];
var url = '';
if (arg == undefined) url = 'http://worldcup.sfg.io/matches';
else if (arg == 'today') url = 'http://worldcup.sfg.io/matches/today';
else if (arg == 'tomorrow') url = 'http://worldcup.sfg.io/matches/tomorrow';
else if (arg == 'current') url = 'http://worldcup.sfg.io/matches/current';
else url = 'http://worldcup.sfg.io/matches/country?fifa_code=' + arg;


request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var matchs = JSON.parse(body);

    if (matchs.length == 0) {
      console.log(whitespace + 'No current match is played right now!'.red.bold);
      console.log('');
    } else {
      for (var i = 0; i < matchs.length; i++) {

        var score = matchs[i]['home_team']['goals'] + ' - ' + matchs[i]['away_team']['goals'];
        var home = matchs[i]['home_team']['country'];
        var away = matchs[i]['away_team']['country'];

        //Some future matches don't have all the information, So we won't need them
        if (home == undefined) break;

        var whitespace1 = '';
        var l1 = (SCREEN_WIDTH - score.length) / 2 - home.length;
        for (var j = 0; j < l1; j++)
          whitespace1 += " ";

        var whitespace2 = '';
        var l2 = (SCREEN_WIDTH - score.length) / 2 - away.length;
        for (var j = 0; j < l2 - 1; j++)
          whitespace2 += " ";

        var status = matchs[i].status;
        var minutes = -moment(matchs[i]['datetime']).diff(moment(), 'minutes');
        var time = moment(matchs[i]['datetime']).fromNow();

        if (status == 'completed') {
          console.log((whitespace + home + whitespace1 + score + whitespace2 + away).bold.green);
          printProgress(1);
          var winner = matchs[i]['winner'];
          if (winner == 'Draw')
            console.log((whitespace + 'Played ' + time + '. ' + 'It was a ' + winner.toLowerCase() + '!').bold);
          else
            console.log((whitespace + 'Played ' + time + '. ' + winner + ' won!').bold);
          
        } else if (status == 'in progress') {
          console.log((whitespace + home + whitespace1 + score + whitespace2 + away).bold.green);

          var progress = minutes / 90;
          if (minutes > 45 && minutes <= 60)
            progress = 0.5 // because the game is stopped after 45 mn for 15 mn
          else if (minutes > 60)
            progress = (minutes - 15) / 90;

          printProgress(progress);
          console.log((whitespace + 'Being played now: ' + minutes + ' minutes gone.').bold);
        } else if (status = 'future') {
          console.log((whitespace + home + whitespace1 + score + whitespace2 + away).bold);
          printProgress(0);
          console.log((whitespace + 'Will be played ' + time + '. ').bold);
        }

        console.log('');
      }
    }
  } else {
    console.log(whitespace + 'Bad argument!'.bold.red);
    console.log('');
  }
});

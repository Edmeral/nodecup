World cup results in the command line. written in Node.JS.

![Today](http://i.imgur.com/MABYicL.png)

This tool is inspired this [python version](https://github.com/fatiherikli/worldcup) and couldn't be done without [Soccer for Good API](worldcup.sfg.io).

## How to Install

First you should have [Node.JS](http://nodejs.org/) installed.

After that, open the the terminal and simply run:
```sh
npm install -g nodecup
```
You might want to add ```sudo``` if the previous command demand administrator rights.

## How to use
This command will show all the matches played/are being played/will be played today.
```sh
nodecup today
```
Or if you want tomorrow's matches:
```sh
nodecup tomorrow
```
![Tomorrow](http://i.imgur.com/7rVWvL8.png)

if you want to see the matches of a specific country run
``` nodecup "FIFA country code" ``` , click [here](http://en.wikipedia.org/wiki/List_of_FIFA_country_codes) for a list of FIFA country codes, for example:
```sh
nodecup GER
```
will show all the matches of Germany

![Ger](http://i.imgur.com/VCFhi65.png)

```sh
nodecup current
```
will show the current matches (if any):

![current](http://i.imgur.com/3lj9cts.png)

and finally 
```sh
nodecup
```
will show all the matches of the world cup:

![all](http://i.imgur.com/p8El6Kc.png)

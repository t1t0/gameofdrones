# gameofdrones
 An UruIT test App
 
 A rock, paper and scissor game app inspired in the tv show *The Big Bang Theory*.
 It is setup to run the a modified version of the game
 *the Rock, Paper, Scissor, Lizard, Spock Version.*


# Instructions 

## Github
Clone or download the repository

## Setup 
Enter in the app folder and run the next command

```bash
npm install
```

## Run server
Run the server with the following command

```bash
npm start
```

if you are gonna make some changes, you may prefer to use nodemon instead
```bash
npm run dev
```

## Change the Rules (moves) settings
To change the rules of the game edit the app.js inside `src/app/` folder. The moves state is what you need to change. Take in count that if there is a logic issue, the app will notify and end the game in progress if needed so you can make the necesary changes in the rules.

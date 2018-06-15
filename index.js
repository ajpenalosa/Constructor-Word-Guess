// Require the inquirer module
var inquirer = require('inquirer');

// Import the word constructor
var Word = require("./Word.js");

var newWord = true;
var guessesRemaining = 10;

// Words
var words = ["Jurassic World", "Avengers", "Deadpool", "Incredibles"];
var currentWord = "";

function game() {

    // If this is a new word, then use the Word constructor
    if ( newWord ) {

        console.log("\r\nGuess the name of the movie\r\n");

        // Picking a random movie from the array
        currentWord = new Word(words[Math.floor(Math.random() * words.length)]);

        // Making the word into a string to console log
        currentWord.wordString();
    }

    // Empty space for readability
    console.log(" ");
    
    inquirer.prompt([
        {
            name: "letter",
            message: "Guess a letter!"
        }
    ]).then(guess => {

        // If a correct letter is guessed, change it to true
        for ( var i = 0; i < currentWord.wordToGuess.length; i++ ) {
            if ( currentWord.wordToGuess[i].toLowerCase() === guess.letter.toLowerCase() ) {
                currentWord.wordLetters[i].userGuess();
            }
        }
        
        console.log(" ");

        // Reconstructing the word to display the current state
        currentWord.wordString();

        // If a wrong letter is guessed && it's not a new word subtract from guesses remaining
        if ( !currentWord.wordToGuess.toLowerCase().includes(guess.letter.toLowerCase()) && !newWord ) {
            guessesRemaining--;
            console.log("\r\n" + guessesRemaining + " guesses remaining!!!");
        }
        
        // If the guesses remaining reaches 0, then game is over
        // Ask player if they want to play again
        if ( guessesRemaining === 0 ) {
            console.log("\r\nGame Over!!\r\n");
            playAgain();
        }

        // If the player guesses the whole word, display congrats message
        // Ask player if they want to play again
        if ( currentWord.guessedState === currentWord.wordToGuess ) {
            console.log("\r\nCONGRATS!! YOU WON!!\r\n");
            playAgain();
        }
        else {

            // Change newWord to false and ask to guess another letter
            newWord = false;
            game();

        }
    
    }); // End of inquirer

}

function playAgain() {
    
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to play again?",
            name: "confirm",
            default: true
        }
    ]).then(answer => {

        if ( answer.confirm ) {

            newWord = true;
            game();
        }
        else {
            console.log("\r\nThank you for playing! Good bye!\r\n");
        }
    
    }); // End of inquirer
}

game();
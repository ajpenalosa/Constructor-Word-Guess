// Import the letter constructor
var Letter = require("./Letter.js");

function Word( wordToGuess ) {
    this.wordToGuess = wordToGuess;
    this.wordLetters = [];

    // Loop that makes each letter into an object and pushes it to the wordLetters array
    for ( var i = 0; i < this.wordToGuess.length; i++ ) {
        var letter = new Letter(this.wordToGuess[i]);
        this.wordLetters.push(letter);
    }

    // Method to put the letters into a string that displays in the console
    this.wordString = function() {
        this.currentState = ""; // Used to display to console
        this.guessedState = ""; // Used for win/lose conditional
        for ( var i = 0; i < this.wordToGuess.length; i++ ) {
            if (this.wordLetters[i].letter === " ") {
                this.currentState += "   ";
                this.guessedState += " ";
            }
            else {
                // Concatenate the letters
                this.currentState += this.wordLetters[i].displayLetter() + " ";
                this.guessedState += this.wordLetters[i].displayLetter();
            }
        } 
        console.log(this.currentState);
    }
    
    // Passes the guessed letter to the userGuess function to check if it's a match
    this.guessedLetters = function( guessedLetter ) {
        for ( var i = 0; i < this.wordToGuess.length; i++ ) {
            this.wordLetters[i].userGuess(guessedLetter);
        }
    }
}

module.exports = Word;
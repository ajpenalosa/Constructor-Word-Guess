// Import the letter constructor
var Letter = require("./Letter.js");

function Word( wordToGuess ) {
    this.wordToGuess = wordToGuess;
    this.wordLetters = [];

    for ( var i = 0; i < this.wordToGuess.length; i++ ) {
        var letter = new Letter(this.wordToGuess[i]);
        this.wordLetters.push(letter);
    }

    this.wordString = function() {
        this.currentState = "";
        for ( var i = 0; i < this.wordToGuess.length; i++ ) {
            this.currentState += this.wordLetters[i].displayLetter() + " ";
        } 
        console.log(this.currentState);
    }
    
    this.guessedLetters = function( letterGuessed ) {
        userGuess( letterGuessed );
    }
}

module.exports = Word;
// Import the letter constructor
var Letter = require("./Letter.js");

function Word( wordToGuess ) {
    this.wordToGuess = wordToGuess;
    this.wordLetters = [];
    this.guessedLetters = 0;

    for ( var i = 0; i < this.wordToGuess.length; i++ ) {
        var letter = new Letter(this.wordToGuess[i]);
        this.wordLetters.push(letter);
    }

    this.wordString = function() {
        this.currentState = "";
        this.guessedState = "";
        for ( var i = 0; i < this.wordToGuess.length; i++ ) {
            if (this.wordLetters[i].letter === " ") {
                this.currentState += "   ";
                this.guessedState += " ";
            }
            else {
                this.currentState += this.wordLetters[i].displayLetter() + " ";
                this.guessedState += this.wordLetters[i].displayLetter();
            }
        } 
        console.log(this.currentState);
    }
    
    // this.guessedLetters = function( letterGuessed ) {
    //     userGuess( letterGuessed );
    // }
}

module.exports = Word;
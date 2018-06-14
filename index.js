// Require the inquirer module
var inquirer = require('inquirer');

// Import the word constructor
var Word = require("./Word.js");

var word = new Word("what");

function game() {

    word.wordString();
    
    inquirer.prompt([
        {
            name: "letter",
            message: "Guess a letter!"
        }
    ]).then(guess => {

        for ( var i = 0; i < word.wordToGuess.length; i++ ) {
            if ( word.wordToGuess[i] === guess.letter ) {
                word.wordLetters[i].userGuess();
                console.log(word.wordLetters);
            }
        }

        word.wordString();

        game();
    
    }); // End of inquirer

}

game();
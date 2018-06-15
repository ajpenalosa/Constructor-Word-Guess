// Require the inquirer module
var inquirer = require('inquirer');

// Import the word constructor
var Word = require("./Word.js");

var newWord = true;
var guessesRemaining = 10;
var guessedArray = [];
var correctGuesses = [];

// Words
var words = ["Jurassic World", "Avengers", "Deadpool", "Incredibles", "Back to the Future", "The Rocketeer", "Jumanji", "Cars", "Thor", "Iron Man", "Indiana Jones", "Sherlock Holmes", "Star Wars", "Solo", "Ready Player One", "Rampage", "Black Panther", "Superman", "Justice League", "Life of the Party"];
var currentWord = "";

function game() {

    // If this is a new word, then use the Word constructor
    if ( newWord ) {

        guessesRemaining = 10;
        guessedArray = [];
        correctGuesses = [];

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
        currentWord.guessedLetters(guess.letter);

        // Console log empty space for readability
        console.log(" ");

        // Reconstructing the word to display the current state
        currentWord.wordString();

        // Display message if player enters more than 1 letter
        if ( guess.letter.length > 1 ) {
            console.log("\r\nPlease type only 1 letter.");
        }
        // If the guessed letter is correct and has not been used before, add it to correctGuesses array
        else if ( currentWord.wordToGuess.toLowerCase().includes(guess.letter.toLowerCase()) && correctGuesses.indexOf(guess.letter) === -1 ) {
            correctGuesses.push(guess.letter);
        }
        // Else if the guessed letter is wrong and has not been used before, add it to guessedArray and subtract guesses Remaining
        else if ( !currentWord.wordToGuess.toLowerCase().includes(guess.letter.toLowerCase()) && guessedArray.indexOf(guess.letter) === -1 && guess.letter.length === 1 ) {
            guessedArray.push(guess.letter);
            guessesRemaining--;
            console.log("\r\n" +  guess.letter.toUpperCase() + " is incorrect. You have " + guessesRemaining + " guesses remaining!!!");
        }
        // Else if the letter has been used before, display message telling the player it's been used already
        else if ( guessedArray.indexOf(guess.letter) !== -1 ||  correctGuesses.indexOf(guess.letter) !== -1 ) {
            console.log("\r\nYou have used \"" + guess.letter.toUpperCase() + "\" already. Please try another letter.");
        }
        
        // If the guesses remaining reaches 0, then game is over
        // Ask player if they want to play again
        if ( guessesRemaining === 0 ) {
            console.log("\r\nSorry! The correct movie was " + currentWord.wordToGuess + "\r\n");
            console.log("Game Over!!\r\n");
            playAgain();
        }

        // If the player guesses the whole word, display congrats message
        // Ask player if they want to play again
        else if ( currentWord.guessedState === currentWord.wordToGuess ) {
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
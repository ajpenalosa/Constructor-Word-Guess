function Letter ( letterToGuess ) {
    this.letter = letterToGuess;
    this.guessed = false;

    // Method that determines what to display
    this.displayLetter = function() {
        if(this.guessed) {
            return letterToGuess;
        }
        else {
            return("_");
        }
    }

    // Changes state to true if letter is guessed
    this.userGuess = function( guessedLetter ) {
        if ( guessedLetter.toLowerCase() === this.letter.toLowerCase() ) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;
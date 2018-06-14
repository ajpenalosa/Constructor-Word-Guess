function Letter ( letterToGuess ) {
    this.letter = letterToGuess;
    this.guessed = false;

    this.displayLetter = function() {

        if(this.guessed) {
            return letterToGuess;
        }
        else {
            return("_");
        }

    }

    this.userGuess = function( ) {
        this.guessed = true;
    }
}

module.exports = Letter;
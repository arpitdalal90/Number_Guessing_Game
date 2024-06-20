document.addEventListener('DOMContentLoaded', function() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guesses = [];
    let maxGuesses = 10;

    const guessInputBar = document.querySelector('.inputBar');
    let submitGuessBtn = document.querySelector('.submitBtn');
    const prevGuesses = document.querySelector('.preGuess');
    const remGuesses = document.querySelector('.remGuess');
    const lowOrHi = document.querySelector('.lowHi');

    submitGuessBtn.addEventListener('click', function(event) {
        event.preventDefault();
        let userGuess = Number(guessInputBar.value);
        if(isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            alert('Please enter a valid number between 1 to 100');
            return;
        }
        guessInputBar.value = "";
        guesses.push(userGuess);
        const remainingGuesses = maxGuesses - guesses.length;

        prevGuesses.textContent = "Previous Guesses: " + guesses.join(', ');
        remGuesses.textContent = "Guesses Remaining: " + remainingGuesses;
        let makingLowHi = Math.abs(randomNumber - userGuess) <= 2;

        if(userGuess == randomNumber) {
            lowOrHi.textContent = 'Congraulations! You guessed the right number.';
            lowOrHi.style.color = 'lightgreen';
            endGame();
        }
        else if(remainingGuesses == 0) {
            lowOrHi.textContent = 'Sorry, you\'ve run out of guesses. The number was ' + randomNumber;
            lowOrHi.style.color = 'red';
            endGame();
        }
        else {
            lowOrHi.textContent = makingLowHi ? 'Very Close' : (userGuess < randomNumber ? 'Too low!' : 'Too high!');
            lowOrHi.style.color = 'yellow';
        }
    });

    let startNewGame = document.body.querySelector('.startNewGameBtn');

    function endGame() {
        guessInputBar.disabled = true;
        submitGuessBtn.disabled = true;
        startNewGame.style.visibility = 'visible';
        startNewGame.onclick = resetGame;
    }

    function resetGame() {
        guessInputBar.disabled = false;
        submitGuessBtn.disabled = false;
        startNewGame.style.visibility = 'hidden';
        guesses = [];
        maxGuesses = 10;
        prevGuesses.textContent = 'Previous Guesses: ';
        remGuesses.textContent = 'Guesses Remaining: ';
        lowOrHi.textContent = '';
    }


    // for enter button
    document.addEventListener('keypress', function(event) {
        if(event.key == 'Enter') submitGuessBtn.click();
    });
})


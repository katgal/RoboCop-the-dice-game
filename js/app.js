/*created by katgal on 2017-04*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("Dead or alive, you're coming with me.");

    //music
    var music = new Audio("audio/mainTheme.mp3");
    music.volume = 0.4;
    music.loop = true;
    music.play();

    var musicSwitch = document.querySelector(".music");
    musicSwitch.addEventListener("click", function() {
        if (music.volume == 0.4) {
            music.volume = 0.0;
            musicSwitch.textContent = "music: OFF";
        } else {
            music.volume = 0.4;
            musicSwitch.textContent = "music: ON";
        }
    });


    //scores variables
    var score, generalScore, currentScore, activePlayer;

    score = [0, 0];
    generalScore = 0;
    currentScore = 0;
    activePlayer = 0;


    //general variables
    var diceImg, newGame, player1panel, player2panel, currentPlayer1, currentPlayer2, scoreGlobal1, scoreGlobal2,
        namePlayer1, namePlayer2;

    player1panel = document.querySelector(".player-0-panel");
    player2panel = document.querySelector(".player-1-panel");

    currentPlayer1 = document.getElementById("current-0");
    currentPlayer2 = document.getElementById("current-1");

    scoreGlobal1 = document.getElementById("score-0");
    scoreGlobal2 = document.getElementById("score-1");

    namePlayer1 = document.getElementById("name-0");
    namePlayer2 = document.getElementById("name-1");



    diceImg = document.querySelector(".dice");
    diceImg.classList.add("showHide");

    newGame = document.querySelector(".btnNewGame");


    var btnRoll = document.querySelector(".btnRoll");

    btnRoll.addEventListener("click", function() {
        //dice
        var dice = Math.floor(Math.random() * 6) + 1;
        diceImg.classList.remove("showHide");
        diceImg.src = "images/dice-" + dice + ".png";

        if (dice !== 1) {
            currentScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = currentScore;
        } else {
            //set active player
            if (activePlayer === 0) {
                activePlayer = 1;

                var roboSpeak = new Audio("audio/creep.wav");
                roboSpeak.volume = 0.3;
                roboSpeak.play();

            } else {
                activePlayer = 0;
                var edSpeak = new Audio("audio/ed.wav");
                edSpeak.volume = 0.3;
                edSpeak.play();

            }
            //reset values
            resetNextPlayer();
        }

    });

    var btnHold = document.querySelector(".btnHold");

    btnHold.addEventListener("click", function() {

        score[activePlayer] += currentScore;
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];

        var setAmmo = document.querySelector("#input").value;
        var wininngScore;
        // setAmmo = /^\d+$/;

        if (setAmmo) {
            wininngScore = setAmmo;
        } else {
            wininngScore = 77;
        }

        if (score[activePlayer] >= wininngScore) {

            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector("#name-" + activePlayer).classList.add("winner");

            diceImg.classList.add("showHide");


        } else {
            if (activePlayer === 0) {
                activePlayer = 1;

            } else {
                activePlayer = 0;
            }
            //reset values
            resetNextPlayer();
        }

    });

    function resetNextPlayer() {
        currentScore = 0;

        currentPlayer1.textContent = "0";
        currentPlayer2.textContent = "0";

        player1panel.classList.toggle("activePlayer");
        player2panel.classList.toggle("activePlayer");

        diceImg.classList.add("showHide");
    }


    newGame.addEventListener("click", function() {

        diceImg.classList.add("showHide");
        currentPlayer1.textContent = "0";
        currentPlayer2.textContent = "0";

        scoreGlobal1.textContent = "0";
        scoreGlobal2.textContent = "0";

        namePlayer1.textContent = "Robocop";
        namePlayer2.textContent = "Ed 209";

        namePlayer1.classList.remove("winner");
        namePlayer2.classList.remove("winner");
        player1panel.classList.remove("activePlayer");
        player2panel.classList.remove("activePlayer");
        player1panel.classList.add("activePlayer");
    });




    //
});

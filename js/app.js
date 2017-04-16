/*created by katgal on 2017-04*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("Dead or alive, you're coming with me.");

    //**********************************************
    //******************** intro *******************
    //**********************************************

    //I tried to find more universal solution but something was wrong, and I need to fugure this out...
    function intro() {
        var action = document.querySelector(".fight");
        var fullscreen = document.querySelector(".start");

        function blink() {
            var blink = document.querySelectorAll(".blink");

            function hide() {

                blink[0].style.opacity = "0";
                blink[1].style.opacity = "0";
                setTimeout(show, 500);
            }

            function show() {

                blink[0].style.opacity = "1";
                blink[1].style.opacity = "1";
                setTimeout(hide, 500);
            }
            hide();
        }
        blink();

        action.addEventListener("click", function() {
            fullscreen.style.display = "none";
        });

    }
    intro();

    //**********************************************
    //***************** game core  *****************
    //**********************************************

    //scores variables
    var score, currentScore, activePlayer, play;

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    play = true;

    //general variables
    var diceImg, newGame, player1panel, player2panel, currentPlayer1, currentPlayer2, scoreGlobal1, scoreGlobal2,
        namePlayer1, namePlayer2, ed, robo;

    player1panel = document.querySelector(".player-0-panel");
    player2panel = document.querySelector(".player-1-panel");

    currentPlayer1 = document.getElementById("current-0");
    currentPlayer2 = document.getElementById("current-1");

    scoreGlobal1 = document.getElementById("score-0");
    scoreGlobal2 = document.getElementById("score-1");

    namePlayer1 = document.getElementById("name-0");
    namePlayer2 = document.getElementById("name-1");

    ed = document.querySelector(".ed");
    robo = document.querySelector(".robo");


    diceImg = document.querySelector(".dice");
    diceImg.classList.add("showHide");

    newGame = document.querySelector(".btnNewGame");

    var btnRoll = document.querySelector(".btnRoll");

    btnRoll.addEventListener("click", function() {
        if (play) {
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
        }
    });

    var btnHold = document.querySelector(".btnHold");
    var critical = document.querySelector(".hit");

    btnHold.addEventListener("click", function() {


        if (play) {
            score[activePlayer] += currentScore;
            document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];

            var setAmmo = document.querySelector("#input").value;
            var winningScore;

            // if(setAmmo !== /^\d+$/){
            // play = false;
            // }
            // setAmmo = /^\d+$/;

            if (setAmmo) {
                winningScore = setAmmo;
            } else {
                winningScore = 50; //default winning score
            }

            if (score[activePlayer] >= winningScore) {

                document.querySelector("#name-" + activePlayer).textContent = "Winner!";
                document.querySelector("#name-" + activePlayer).classList.add("winner");

                diceImg.classList.add("showHide");
                //ending Robo
                if (score[0] >= winningScore) {
                    edDestroyed();
                    setTimeout(roboWins, 5000);

                } else {
                    roboDestroyed();
                    setTimeout(edWins, 3000);
                }

                play = false; //stop playing

            } else if (score[0] === (winningScore - 37) || score[0] === (winningScore - 29) || score[0] === (winningScore - 6)) {
                //robo wins by critical hit - default values: 13, 21,44
                document.querySelector("#name-0").textContent = "Winner!";
                document.querySelector("#name-0").classList.add("winner");

                diceImg.classList.add("showHide");

                edDestroyed();

                critical.style.display = "block";
                //ending Robo
                setTimeout(roboWins, 5000);

                play = false; //stop playing

            } else if (score[1] === (winningScore - 17) || score[1] === (winningScore - 3)) {
                //ed wins by critical hit - default values: 33, 47
                document.querySelector("#name-1").textContent = "Winner!";
                document.querySelector("#name-1").classList.add("winner");

                diceImg.classList.add("showHide");

                roboDestroyed();
                critical.style.display = "block";

                setTimeout(edWins, 3000);
                play = false;
            } else {
                if (activePlayer === 0) {
                    activePlayer = 1;

                } else {
                    activePlayer = 0;
                }
                //reset values
                resetNextPlayer();
            }
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

    //new game button
    newGame.addEventListener("click", function() {

        var deadOrAlive = new Audio("audio/dead-alive.wav");
        deadOrAlive.volume = 0.4;
        deadOrAlive.play();
        //clear functions scores
        score = [0, 0];
        currentScore = 0;
        activePlayer = 0;
        play = true;
        //hide dice
        diceImg.classList.add("showHide");
        //clear current score html
        currentPlayer1.textContent = "0";
        currentPlayer2.textContent = "0";
        //clear global score html
        scoreGlobal1.textContent = "0";
        scoreGlobal2.textContent = "0";
        //reset names
        namePlayer1.textContent = "Robocop";
        namePlayer2.textContent = "Ed 209";
        //removes classes and set activePlayer on player1
        namePlayer1.classList.remove("winner");
        namePlayer2.classList.remove("winner");
        player1panel.classList.remove("activePlayer");
        player2panel.classList.remove("activePlayer");
        player1panel.classList.add("activePlayer");
        //reset images
        robo.src = "images/robo.jpg";
        ed.src = "images/ed.jpg";
        //reset ammo input
        document.querySelector("#input").value = "";
        //clear critical strike
        critical.style.display = "none";

    });
    //robocop wins
    function roboWins() {
        var end1 = document.querySelector(".endRobo");
        end1.classList.remove("showHide");

        var thanku = new Audio("audio/thanku.wav");
        thanku.volume = 0.4;
        var fired = function() {
            thanku.play();
        };
        setTimeout(fired, 2000);

        var murphy = new Audio("audio/murphy.wav");
        murphy.volume = 0.4;
        var name = function() {
            murphy.play();
        };
        setTimeout(name, 10000);
        //close ending board and show credits
        document.querySelector(".credits").addEventListener("click", function() {
            end1.classList.add("showHide");
            var creditBoard = document.querySelector(".creditsBoard");
            creditBoard.classList.remove("showHide");

            var goodNight = new Audio("audio/coop.wav");
            goodNight.volume = 1;
            goodNight.play();
            //return to game
            document.querySelector(".closeCredits").addEventListener("click", function() {

                creditBoard.classList.add("showHide");
            });
        });
    }
    //ed wins
    function edWins() {
        var end2 = document.querySelector(".endEd");
        end2.classList.remove("showHide");

        var dollar = new Audio("audio/dollar.wav");
        dollar.volume = 0.4;
        var gameOver = function() {
            dollar.play();
        };
        setTimeout(gameOver, 500);

        document.querySelector(".tryAgain").addEventListener("click", function() {
            end2.classList.add("showHide");
        });

    }
    //audio and images for winners
    function edDestroyed() {
        var fix = new Audio("audio/fix.wav");
        fix.volume = 0.4;
        fix.play();
        ed.src = "images/hit.jpg";
    }

    function roboDestroyed() {
        var disappointed = new Audio("audio/dis.wav");
        disappointed.volume = 0.4;
        disappointed.play();
        robo.src = "images/robodead.jpg";
    }

    //**********************************************
    //**************** instruction *****************
    //**********************************************

    function instruction() {
        var instr = document.querySelector(".instructionBoard");

        document.querySelector(".instruction").addEventListener("click", function() {
            instr.classList.remove("showHide");
        });

        document.querySelector(".return").addEventListener("click", function() {
            instr.classList.add("showHide");
        });
    }
    instruction();
    //**********************************************
    //******************** music *******************
    //**********************************************

    function music() {
        var music = new Audio("audio/main-theme.mp3");
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
    }
    music();

});

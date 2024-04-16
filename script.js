window.onload = function(){

    var startScreen = document.getElementById("startScreen");
    var gameScreen = document.getElementById("gameScreen");
    var gameOverScreen = document.getElementById("gameOverScreen");

    //variables for timer
    var timeDisplay = document.getElementById("timeDisplay");
    var timeScore = document.getElementById("timeScore");
    var startTime;
    var timerInterval;
    var elapsedPausedTime = 0;
    var seconds;
    var minutes;
    var hours;
    var elapsedTime;
    var currentTime;

    function startTimer() {
        startTime = new Date().getTime() - elapsedPausedTime;
        timerInterval = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
    clearInterval(timerInterval);
    elapsedPausedTime = new Date().getTime() - startTime;
    timerInterval = null;
    }

    function resetTimer() {
    stopTimer();
    elapsedPausedTime = 0;
    timeDisplay.innerHTML = "00:00:00";
    }

    function updateTimer() {
    currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    seconds = Math.floor(elapsedTime / 1000) % 60;
    minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    timeDisplay.innerHTML = displayTime;
    }

    function pad(number) {
    // add a zero in front if the number is less than 10
    return (number < 10 ? "0" : "") + number;
    }


    var playBtn = document.getElementById("playBtn");

    let shortcutCount;

    // play button onclick start game
    playBtn.addEventListener("click", function() {
    
        startScreen.style.display = "none";
        gameScreen.style.display = "block";

        startGame();
        startTimer();

    });

    var playAgainBtn = document.getElementById("playAgainBtn");

    // play again button onclick restart game
    playAgainBtn.addEventListener("click", function() {
    
        gameOverScreen.style.display = "none";
        gameScreen.style.display = "block";

        //reset shortcut count
        // shortcutCount = 0;

        resetTimer();
        startGame();
        startTimer();

    });


    function startGame(){
        let shortcutInput;
        shortcutCount = 0;

        // event listeners for keyboard shortcuts
        document.addEventListener("keydown", function(event) {
            if (event.key === "x" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "cut";
                if(shortcut === shortcutInput){
                    // shortcutPressed();
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });
    
        document.addEventListener("keydown", function(event) {
            if (event.key === "c" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "copy";
                if(shortcut === shortcutInput){
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });
    
        document.addEventListener("keydown", function(event) {
            if (event.key === "v" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "paste";
                if(shortcut === shortcutInput){
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });

        document.addEventListener("keydown", function(event) {
            if (event.key === "s" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "save";
                if(shortcut === shortcutInput){
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });

        document.addEventListener("keydown", function(event) {
            if (event.key === "p" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "print";
                if(shortcut === shortcutInput){
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });

        document.addEventListener("keydown", function(event) {
            if (event.key === "z" && (event.metaKey === true|| event.ctrlKey === true)) {
                shortcutInput = "undo";
                if(shortcut === shortcutInput){
                    gameLoop();
                }
                // prevent default browser behavior
                event.preventDefault();
                }
        });

        var shortcutText = document.getElementById("shortcutText")

        // generate random shortcut from array of shortcuts
        const shortcuts = ["cut", "copy", "paste", "save", "print", "undo"];

        // variable to store randomly generated shortcut
        let shortcut;

        //variable to store the previous shortcut
        let lastShortcut;


        //start game
        gameLoop();

        //game is a series of 20 shortcuts
        function gameLoop(){

            if(shortcutCount < 20){
                shortcutCount++;
                
                generateShortcut();
            } else{
                gameOver();
                stopTimer();
                console.log(elapsedPausedTime);
                var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
                timeScore.innerHTML = displayTime;
                return false;
            }
        }



        function generateShortcut(){
            //so that the same shortcut doesn't appear twice in a row, keep generating shortcut until it's different from the last one
            do {
                shortcut = shortcuts[Math.floor(Math.random() * shortcuts.length)];
            } while (shortcut === lastShortcut);
        
            lastShortcut = shortcut;

            shortcutText.innerHTML = shortcut;

        }
    }

    function gameOver(){
        gameScreen.style.display = "none";
        gameOverScreen.style.display = "block";
    }
}
//This variable keeps track of whose  turn it is.  
let activeplayer='X';
// This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn't been seleted already.
    //The .some() method is used to check each element of the selectSquare array
    //to see if it contains the square number clicked on. 
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This variable retrieves the HTML element id that was clicked.
        let select = document.getElementById(squareNumber);
        //This condition checks who's turn it is.
        if (activeplayer === 'X') {
            // If activePlayer is equal to 'X', the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/x.png")';
            //Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            //If activePlayer is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        // this calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing the acive player.
        if (activePlayer ==='X') {
            //If active player is 'X' change it to 'O'.
            activePlayer = 'O';
            //If active player is anything other than 'X'
        } else {
            //change the activePlayer to 'X'
            activePlayer = 'X';
        }
        //This function plays placement sound.
        Audio('XXXXXXXXXXXXX');
        //This condition checks to see if it is the computers turn.
        if (activePLayer ==='O') {
            //This function disables clicking for computer turns. 
            disableClick();
            //This function waits 1 second before the computer places an image and enables click.
            setTimeout(function () { ComputersTurn();}, 1000);
        }
        //Returning true is needed for our computersTurn() function to work.
        return true;
    }
    //This function results in a random square being selected by the computer.
    function computersTurn() {
        //This boolean is needed for our while loop.
        let success = false;
        //This variable stores a random number 0-8.
        let pickASquare;
        //This condition allows our while loop to keep trying if a square is selected already.
        while (!success) {
            // A random number between 0 and 8 is selected.
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evaluated returns true, the square hasn't been selected yet.
            if (placeXOrO (pickASquare)) {
                //This line calls the function.
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop.
                success = true;
            }
        }
    }
}

//This function parses the selectedSquares array to search for win conditions. 
//drawLine() function is called to draw a line on the screen if the condition is met. 
function checkwinConditions () {
    // X 0, 1, 2 condition.
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    // X 3, 4, 5 condition.
    else if (arrayIncludes ('3X', '4X', '5X')) { drawWinline(50, 304, 558, 304) }
    // X 6, 7, 8 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawwinLine(50, 508, 558, 508) }
    // X 0, 3, 6 condition.
    else if (arrayIncludes ('0X', '3X','6X')) { drawWinLine(100, 50, 100, 558) }
    // X 1, 4, 7 condition.
    else if (arrayIncludes ('1X', '4x', '7X')) { drawwinLine(304, 50, 304, 558) }
    // X 2, 5, 8 condition.
    else if (arrayIncludes ('2X', '5X' , '8X')) { drawWinLine(508, 50, 508, 558) }
    // X 6, 4, 2 condition.
    else if (arrayIncludes ('6X', '4X', '2X')) { drawwinLine(100, 508, 510, 90) }
    // X 0, 4, 8 condition.
    else if (arrayIncludes('0X', '4x','8X')) { drawwinline(100, 100, 520, 520) }
    // O 0, 1, 2 condition.
    else if (arrayIncludes('00', '10', '20')) { drawwinline(59, 100, 558, 100) }
    // O 3, 4, 5 condition.
    else if (arrayIncludes ('30', '40', '50')) { drawwinline(50, 304, 558, 304) }
    // O 6, 7, 8 condition.
    else if (arrayIncludes('60', '70', '80')) { drawwinline (50, 508, 558, 508) }
    // O 0, 3, 6 condition.
    else if (arrayIncludes ('00', '30', '60')) { drawwinline(100, 50, 100, 558) }
    // O 1, 4, 7 condition.
    else if (arrayIncludes ('10', '40', '70')) { drawWinLine(304, 50, 304, 558) }
    // O 2, 5, 8 condition.
    else if (arrayIncludes ('20', '50', '80')) { drawwinline(508, 50, 508, 558) }
    // O 6, 4, 2 condition.
    else if (arrayIncludes ('60', '40', '20')) { drawwinLine(100, 508, 510, 90) }
    // O 0, 4, 8 condition.
    else if (arrayIncludes('0O', '40', '80')) { drawWinLine(100, 100, 520, 520)}
    //This condition checks for a tie. If none of the above conditions are met and
    //9 squares are selected the code executes.
    else if (selectedSquares.length >= 9) {
        //This function lays the tie game sound.
        Audio(media/Tie.mp3);
        //This function sets a .3 second timer before the resetGame is called.
        setTimeout(function (){ resetgame ();}, 500);
    }
    //This function checks if an array includes 3 satrings. It is used to check for
    // each win condidition.
    function arrayIncludes(squareA, squareB, SquareC) {
        //These 3 variables will be used to check for 3 in a row. 
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables we pass are all included in our array then
        // true is returned and our else if condition executes the drawLine() function.
        if (a === true && b === true && c === true) { return true; }
    }
}

//This function makes our body element temporarily unclickable.
function disableClick() {
    //This makes our body unclickable.
    ReportBody.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second.
    setTimeout(function () {ReportBody.style.pointerEvents = 'Auto';}, 1000);
}

//This function takes a string parameter of the path you set earliest for 
//placement sound ('./js/media/place.mp3')
function audio(audioURL) {
    // we create a new audio object and we pass the path as a parameter.
    let audio = new audio(audioURL);
    //PLay method plays our audio sound.
    audio.play();
}

//This function utilizes HTML canvas to draw win lines.
function drawWinLine(coordX1, coordY, coordx2, coordY2) { 
    //This line accesses our HTML canvas element.
    const canvas = document.getElementById('win-lines');
    //This line gives us access to methods and properties to use on canvas.
    const c = canvas.getcontext ('2d');
    //This line indicates where the start of a lines x axis is.
    let x1 = coordX1,
        //This line indicates where the start of a lines y axis is.
        Yl = coordY1,
        //This line indicates where the end of a lines x axis is.
        x2 = coordx2,
        //This line indicates where the end of a lines y axis is.
        y2 = coordy2, 
        //This variable stores temporary x axis data we update in our animation loop.
        x = x1,
        //This variable stores temporary y axis data we update in our animation loop.
        У = у1;
        //This function interacts with the canvas. 
        function animateLineDrawing() { 
            //This variable creates a loop.
            const animationLoop = requestAnimationFrame (animateLineDrawing);
            //This method clears content from the last loop iteration.
            c. clearRect (0, 0, 608, 608);
            //This method starts a new path.
            c. beginPath(); 
            //This method moves us to a starting point in our line.
            c. moveTo(x1, y1); 
            //This method indicates the end point in our line.
            c. lineto(x, y); 
            //This method sets the width of our line.
            c.lineWidth = 10; 
            //This method sets the color of our line.
            c. strokestyle = 'rgba(70, 255, 33, 8)'; 
            //This method draws everything we laid out above. 
            c. stroke(); 
            //This condition checks if we ve reached the endpoints. 
            if (X1 <= x2 && y1 <= y2) {
                //This condition adds 10 to the previous end x endpoint.
                if (x < x2) { x += 10; } 
                //This condition adds 10 to the previous end y endpoint.
                if (y < y2) { y += 10; }
                //This condition is similar to the one above.
                //This is necessary for the 6, 4, 2 win conditions. 
                if (X >= x2 && Y>= y2) { cancelAnimationFrame(animationLoop); }
            }
            //This condition is similar to the one above.
            //This is necessary for the 6, 4, 2 win condition. 
            if (x1 <= x2 && y1 >= y2) {
                if (x < x2) {x += 10;}
                if (x > y2) {x -= 10;}
                if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
            }
        }
        //This function clears our canvas after our win line is drawn.
        function clear() { 
            //This line starts our animation loop.
            const animationLoop = requestAnimationFrame (clear);
            //This line clears our canvas.
            c. clearRect (0, 0, 608, 608); 
            //This line stops our animation loop.
            cancelAnimationFrame(animationLoop);
        }	
        //This line disallows clicking while the win sound is playing
        disableClick(); 
        //this line plays the win sounds.
        audio('./media/winGame.mp3'); 
        //This line calls our main animation loop.
        animateLineDrawing(); 
        //This line waits 1 second. Then, clears canvas, resets game, an allows clicking again.
        setTimeout (function () { clear(); resetGame(); }, 1000);
}

//This function resets the game in the event of a tie or a win.
function resetGame() {
    //This for loop iterates through each HTML square element.
    for (let i = 0; i < 9; i++) {
        //This variable gets the HTML element i.
        let square = document.getElementById(String(i));
        //This removes our elements backgroundImage.
        square.style.backgroundImage = '';
    }
    //This resets our arrya so it is empty and we can start over.
    selectedSquares = [];
}
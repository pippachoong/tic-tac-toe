console.log("tic tac toe")

//click one box and register the box is clicked
//each boxes are identified by their own id



//if first click, it will be player 1 starting
// second click will be player two's turn 
let playerOnesTurn = true


const changeTurns = function () {
    playerOnesTurn = !playerOnesTurn
    //               ^ if was false, make it true and vice versa
};

//how to identify player one select which box. player one will always start first - blue
//how to identify player two select which box - orange
$('.box').on('click', function () {
    let idBox = $(this).attr('id') // saved clicked boxes and save into a variable 
    if (boxes[idBox] !== null) {//boxes not to be overriden
        console.log("Silly booboo you chose a box that's already taken. Go get your own room cuckoo")
        return
    }
    if (playerOnesTurn === true) {
        $(this).css('border', '10px solid blue');//register when box is clicked
        boxes[idBox] = "playerOne"//update idBox to playerOne
    } else {
        $(this).css('border', '10px solid orange');//register when box is clicked
        boxes[idBox] = "playerTwo"//update idBox to playerTwo
    }
    changeTurns()
    resultWin()

    console.log(boxes)
});


//identify each boxes from HTML
const boxes = {
    '1a': null,
    '1b': null,
    '1c': null,
    '2a': null,
    '2b': null,
    '2c': null,
    '3a': null,
    '3b': null,
    '3c': null,
};



//if "playerOne" or "playerTwo" get 3 similar box in array, they win
let winner = null;
let draw = null;
let gameActive = true;
const resultWin = function () {
    console.log(`Running result win function`);
    // winning conditions 
    // how to detect three same colors on one row/column/diagonal
    const winningCombos = [
        [boxes['1a'], boxes['1b'], boxes['1c']],//winningCombo[0]
        [boxes['2a'], boxes['2b'], boxes['2c']],//winningCombo[1]
        [boxes['3a'], boxes['3b'], boxes['3c']],//winningCombo[2]
        [boxes['1a'], boxes['2a'], boxes['3a']],
        [boxes['1b'], boxes['2b'], boxes['3b']],
        [boxes['1c'], boxes['2c'], boxes['3c']],
        [boxes['1a'], boxes['2b'], boxes['3c']],
        [boxes['1c'], boxes['2b'], boxes['3a']],//winningCombo[7]
    ]

    for (let i = 0; i < winningCombos.length; i++) {
        if (
            winningCombos[i][0] === winningCombos[i][1] &&
            winningCombos[i][1] === winningCombos[i][2] &&
            winningCombos[i][0] !== null
        ) {
            winner = winningCombos[i][0]
            console.log(`We have a winner!Congratulations ${winner}!`)
            gameActive = false
            return winner
        } else if (
            winningCombos.length === winningCombos[i][0] &&
            winningCombos[i][0] !== null
        ) {
            console.log(`it is a draw`)
        }
    }
};
// how to detect all boxes taken /no winner = it's a draw

//how to stop game after player has won






//also how to refresh the game 










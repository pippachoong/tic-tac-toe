console.log("tic tac toe")

//identify each boxes from HTML
let boxes = {
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

//if first click, it will be player 1 starting
// second click will be player two's turn 
let playerOnesTurn = true

//if "playerOne" or "playerTwo" get 3 similar box in array, they win
let winner = null;
let draw = null;
let gameActive = true; // stop game after player has won
let playerOne = null;
let playerTwo = null;
const resultMessage = document.getElementById('resultMessage') //for DOM to show result
const resultMessageText = document.querySelector('#result-text')//for DOM to show result
const restartButton = document.getElementById('button')


//click one box and register the box is clicked
//each boxes are identified by their own id
const changeTurns = function () {
    playerOnesTurn = !playerOnesTurn
    //               ^ if was false, make it true and vice versa
};

//how to identify player one select which box. player one will always start first - blue
//how to identify player two select which box - orange
$('.box').on('click', function () {
    let idBox = $(this).attr('id') // saved clicked boxes and save into a variable

    if (boxes[idBox] !== null) {//boxes not to be overriden
        console.log("a box that's already taken.")
        return
    }
    if (gameActive === false) {//boxes not to be overriden
        console.log("game end!")
        return
    }
    if (playerOnesTurn === true) {
        playerOne = $(this).addClass('player-one')//register when box is clicked
        boxes[idBox] = "playerOne"//update idBox to playerOne
    } else {
        playerTwo = $(this).addClass('player-two');//register when box is clicked
        boxes[idBox] = "playerTwo"//update idBox to playerTwo
    }
    changeTurns()
    resultDraw()
    resultWin()

    // console.log(boxes)
    console.log(boxes[idBox])
});



const resultDraw = function () {

    // Object.values(boxes) = show which boxes are taken(playerOne/playerTwo/null) in an array form. 
    //if there is no null in the object Boxes (boxes filled) && no win, it is a tie 
    if (Object.values(boxes).includes(null) === false) { //if there's no null in the array
        console.log('It is a tie!')
        resultMessageText.innerText = 'It is a Tie!'
        resultMessage.classList.add('show')


    }
};

const resultWin = function () {
    // console.log(`Running result win function`);
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
        // console.log(winningCombos.length);

        if (
            winningCombos[i][0] === winningCombos[i][1] &&
            winningCombos[i][1] === winningCombos[i][2] &&
            winningCombos[i][0] !== null
        ) {
            winner = winningCombos[i][0]
            console.log(`We have a winner!Congratulations ${winner}!`)
            resultMessageText.innerText = `${winner} wins!`
            resultMessage.classList.add('show')
            gameActive = false //if game is not active, it stops 
            return winner
        }
    }
};


const resetFunction = function () {
    for (const key in boxes) {
        boxes[key] = null
    }
};

//boxes show more detailed status of the game
//to reset board: think of what is the status of the board. before reset - there are no nulls.
//what to expect after the reset in the box - show all null

$("#restart").on('click', function () {
    console.log(`restart!`)
    resetFunction();//clear JS function
    $('.box').removeClass('player-one player-two');//clear the DOM
    resultMessage.classList.remove('show')
    gameActive = true

});




















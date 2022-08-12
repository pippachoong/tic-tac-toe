console.log("tic tac toe")
//Game Logic-----------------
//if first click, it will be player 1 starting
// second click will be player two's turn 
let playerOnesTurn = true
let playerRobotsTurn = null;
let playerOne = null;
let playerTwo = null;
let winner = null;
let draw = null;
let gameActive = true; // stop game after player has won
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

//Game scores -------------------
let playerOneScore = 0;
let playerTwoScore = 0;
const scorePoint = 1;

//DOM  ------------
const resultMessage = document.getElementById('resultMessage') //for DOM to show result
const resultMessageText = document.querySelector('#result-text')//for DOM to show result
const restartButton = document.getElementById('button')
const audio = new Audio("audio/Chocolate_grows.ogg")
const audioResult = new Audio("audio/Square_removed2.ogg")
const audioRestart = new Audio("audio/Nut_out1.ogg")
const audioWin = new Audio("audio/Sweet!.ogg")
//---------------


//Click handler functions-----------------------
const gameStart = function () {

    let idBox = $(this).attr('id') // saved clicked boxes and save into a variable

    if (boxes[idBox] !== null) {//boxes not to be overriden
        console.log("a box that's already taken.")
        return
    }
    if (gameActive === false) {//boxes not to be overriden
        console.log("game end!")
        return
    }
    if (playerOnesTurn === true) { //in JS
        $(this).addClass('player-one')//register when box is clicked for DOM. 
        boxes[idBox] = "playerOne"//update idBox to playerOne
        audio.play()

    } else {
        $(this).addClass('player-two');//register when box is clicked for DOM. 
        boxes[idBox] = "playerTwo"//update idBox to playerTwo
        audio.play()
    }

    changeTurns()
    resultDraw()
    resultWin()
    updateScore()
    setTimeout(robotFunction, 500)
    // console.log(boxes)
    console.log(boxes[idBox])
}
$('.box').on('click', gameStart);

const restartGame = function () {
    console.log(`restart!`)
    resetFunction();//clear JS function
    audioRestart.play()
    $('.box').removeClass('player-one player-two');//clear the DOM
    resultMessage.classList.remove('show')
    gameActive = true
    playerOnesTurn = true
};
$("#restart").on('click', restartGame);

const robotButtonActivated = function () {
    console.log("robot activated");
    playerRobotsTurn = !playerRobotsTurn;
};
$("#switch").on("click", robotButtonActivated);


//Robot Function 
const robotFunction = function () {

    if (gameActive === false) {//boxes not to be overriden
        console.log("game end!")
        return
    }
    if (playerRobotsTurn === true) {
        const randomId = getRandomPick();//make it var for Dom
        boxes[randomId] = "playerTwo";
        $(`#${randomId}`).addClass('player-two')//jQuery searches for div with the specified id
        audio.play()
        changeTurns()
        resultDraw()
        resultWin()
        updateScore()
    }
};

const getRandomPick = function () {
    let nestedArraysofResults = Object.entries(boxes) //e.g [['1a', null], ['1b',playerOne ],...]
    let boxesThatAreNull = [] // only contain null boxes with end result: ['1a', '2b' '3c']

    for (let i = 0; i < nestedArraysofResults.length; i++) {
        const arrayOfResults = nestedArraysofResults[i];//gives format of ['1a',null] for example
        // if the box is null, push it to the boxesThatAreNull array
        if (arrayOfResults.includes(null)) {
            boxesThatAreNull.push(arrayOfResults[0])
        }
    }  // boxesThatAreNull is an array

    return boxesThatAreNull[Math.floor(Math.random() * boxesThatAreNull.length)];
};

//Helper functions-------------------------------
//click one box and register the box is clicked
//each boxes are identified by their own id
const changeTurns = function () {
    // if (playerOnesTurn === true) {
    //     playerOnesTurn = false
    // } else { // meaning playerOnesTurn === false
    //     playerOnesTurn = true
    // }
    playerOnesTurn = !playerOnesTurn
    //               ^ if was false, make it true and vice versa
};

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
            winner = winningCombos[i][0]//output playerOne or playerTwo
            let winnerPrettyName = null;
            if (winner === "playerOne") {
                winnerPrettyName = "Player One"
                playerOneScore += scorePoint
            } else {
                winnerPrettyName = "Player Two"
                playerTwoScore += scorePoint
            }
            console.log(`We have a winner!Congratulations ${winner}!`)
            resultMessageText.innerText = `${winnerPrettyName} wins!`
            audioWin.play()
            resultMessage.classList.add('show')
            gameActive = false //if game is not active, it stops 
            return winner
        }
    }
};

const resetFunction = function () {
    //boxes show more detailed status of the game
    //to reset board: think of what is the status of the board. before reset - there are no nulls.
    //what to expect after the reset in the box - show all null
    for (const key in boxes) {
        boxes[key] = null
    }
};

const updateScore = function () {
    $('#playerone-score').text(`${playerOneScore}`)
    $('#playertwo-score').text(`${playerTwoScore}`)
};





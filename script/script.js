function CreatePlayer(playerName, value)
{
    this.playerName = playerName;
    this.value = value;
}

CreatePlayer.prototype.bIsWinnerPresent = false;
CreatePlayer.prototype.bIsPlayerTurn = true;

const GameBoard = (function ()
{
    const gameBoard = [];
    while (gameBoard.length < 3)
    {
        const row = new Array(3).fill(Math.round((Math.random()) * 25)); // Not Optimal extremely low chance of this causing a bug if players only fill in two rows. Maybe make each cell of the array a random value?
        gameBoard.push(row);
    }

    function getGameBoardIndex(indexFirst, indexSecond)
    {
        return gameBoard[indexFirst][indexSecond];
    }

    function setValueGameBoard(indexFirst, indexSecond, value)
    {
        gameBoard[indexFirst][indexSecond] = value;
        displayGameBoard();
    }

    function displayGameBoard()
    {
        // console.log(
        //     JSON.parse(
        //         JSON.stringify(gameBoard)
        //     )
        // ); // Code provided by tobyplaysuke can be useful for debugging and also solves the issue which occurs when a normal console.log is done with array
        return gameBoard;
    }

    function checkGameBoardWinner()
    {
        // Could put all with a || but will be harder to troubleshoot maybe loop it?

        // 4 Comparisons when center is chosen
        if (gameBoard[1][1] === gameBoard[0][0] && gameBoard[1][1] === gameBoard[2][2])
        {
            return gameBoard[1][1];
        }
        if (gameBoard[1][1] === gameBoard[2][0] && gameBoard[1][1] === gameBoard[0][2])
        {
            return gameBoard[1][1];
        }
        if (gameBoard[1][1] === gameBoard[0][1] && gameBoard[1][1] === gameBoard[2][1])
        {
            return gameBoard[1][1];
        }
        if (gameBoard[1][1] === gameBoard[1][0] && gameBoard[1][1] === gameBoard[1][2])
        {
            return gameBoard[1][1];
        }
        // 2 Comparisons when bottom right is chosen
        if (gameBoard[2][2] === gameBoard[2][1] && gameBoard[2][2] === gameBoard[2][0])
        {
            return gameBoard[2][2];
        }
        if (gameBoard[2][2] === gameBoard[1][2] && gameBoard[2][2] === gameBoard[0][2])
        {
            return gameBoard[2][2];
        }
        // 2 Comparisons when top left is chosen 
        if (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2])
        {
            return gameBoard[0][0];
        }
        if (gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0])
        {
            return gameBoard[0][0];
        }
        return false;
    }

    return {
        getGameBoardIndex,
        setValueGameBoard,
        displayGameBoard,
        checkGameBoardWinner
    }

})();

function newGame()
{
    playGame();
}

const PlayersCreated = (function ()
{
    const player1 = new CreatePlayer("Player1", "X");
    const player2 = new CreatePlayer("Player2", "O");
    let turns = 1;

    function getPlayerOne()
    {
        return {
            name: player1.playerName,
            value: player1.value
        };
    }

    function getPlayerTwo()
    {
        return {
            name: player2.playerName,
            value: player2.value
        };
    }

    function updateTurns()
    {
        turns++;
    }

    function checkTurns()
    {
        return turns;
    }

    return {
        getPlayerOne,
        getPlayerTwo,
        updateTurns,
        checkTurns
    }

})();


function playGame()
{
    GameBoard.displayGameBoard();
}

const displayGameBoardWeb = (function ()
{
    const allBoardCells = document.querySelectorAll(".boardCell")
    allBoardCells.forEach((element) =>
    {
        element.addEventListener('click', gameFlow)
    })

    function removeGameBoardListener()
    {
        allBoardCells.forEach((element) =>
        {
            element.removeEventListener('click', gameFlow)
        })
    }

    function updateDisplayGameBoard()
    {
        GameBoard.displayGameBoard().reduce((iterativeValue, currentElement) =>
        {
            for (let value of currentElement)
            {
                allBoardCells[iterativeValue++].textContent = value;
            }
            return iterativeValue;
        }, 0)
    }
    return {
        updateDisplayGameBoard,
        removeGameBoardListener
    }
})();


function gameFlow(element)
{
    // Make a function for the below later called gameflow
    const player1 = PlayersCreated.getPlayerOne();
    const player2 = PlayersCreated.getPlayerTwo();
    let indexOneValue;
    let indexTwoValue;
    [indexOneValue, , indexTwoValue] = element.target.dataset.indexNumber;
    indexOneValue = parseInt(indexOneValue);
    indexTwoValue = parseInt(indexTwoValue);
    // Modify Later for checking
    if (GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'X' || GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'O')
    {
        return;
    }
    if (CreatePlayer.prototype.bIsPlayerTurn)
    {
        GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player1.value);
        displayGameBoardWeb.updateDisplayGameBoard();
        CreatePlayer.prototype.bIsPlayerTurn = false;
    }
    else
    {
        GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player2.value);
        displayGameBoardWeb.updateDisplayGameBoard();
        CreatePlayer.prototype.bIsPlayerTurn = true;
    }
    if (PlayersCreated.checkTurns() > 4 && GameBoard.checkGameBoardWinner())
    {
        GameBoard.checkGameBoardWinner() === 'X' ? console.log(`${player1.name} is The Winner`) : console.log(`${player2.name} is The Winner`)
        CreatePlayer.prototype.bIsWinnerPresent = true;
        displayGameBoardWeb.removeGameBoardListener();

    }
    if (PlayersCreated.checkTurns() > 8)
    {
        console.log(PlayersCreated.checkTurns());
    }
    PlayersCreated.updateTurns();
}


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
        const row = new Array(3).fill(Math.random()); // Not Optimal extremely low chance of this causing a bug if players only fill in two rows. Maybe make each cell of the array a random value?
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
        console.log(
            JSON.parse(
                JSON.stringify(gameBoard)
            )
        ); // Code provided by tobyplaysuke can be useful for debugging and also solves the issue which occurs when a normal console.log is done with array
        // console.log(gameBoard);
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

function playGame()
{
    const player1 = new CreatePlayer("Player1", "X") //prompt("Enter Name","test")
    const player2 = new CreatePlayer("Player2", "O");
    GameBoard.displayGameBoard();
    let i = 1
    while (!CreatePlayer.prototype.bIsWinnerPresent)
    {
        let indexOneValue = parseInt(prompt("Enter Value Location"));
        let indexTwoValue = parseInt(prompt("Enter Value Location"));
        while (GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'X' || GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'O')
        {
            indexOneValue = parseInt(prompt("Location Taken Enter A New Value First Index Location"));
            indexTwoValue = parseInt(prompt("Location Taken Enter A New Value Second Index Location"));
        }
        if (CreatePlayer.prototype.bIsPlayerTurn)
        {
            GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player1.value);
            CreatePlayer.prototype.bIsPlayerTurn = false;
        }
        else
        {
            GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player2.value);
            CreatePlayer.prototype.bIsPlayerTurn = true;
        }
        if (i > 4 && GameBoard.checkGameBoardWinner())
        {
            GameBoard.checkGameBoardWinner() === 'X' ? console.log(`${player1.playerName} is The Winner`) : console.log(`${player2.playerName} is The Winner`)
            CreatePlayer.prototype.bIsWinnerPresent = true;
        }
        if (i > 8)
        {
            console.log(i);
            break;
        }
        i++;
    }
}

// newGame();
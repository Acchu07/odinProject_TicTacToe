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
        const row = new Array(3)
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

const NumberOfTurnsData = (function ()
{
    let turns = 1;

    function updateTurns()
    {
        turns++;
    }

    function checkTurns()
    {
        return turns;
    }

    return {
        updateTurns,
        checkTurns
    }

})();



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
                if(value === 'X'){
                    allBoardCells[iterativeValue].classList.add('boardCellUpdatedBackgroundX');
                    allBoardCells[iterativeValue].textContent = value;
                }
                else if(value === 'O'){
                    allBoardCells[iterativeValue].classList.add('boardCellUpdatedBackgroundO');
                    allBoardCells[iterativeValue].textContent = value;
                }
                iterativeValue++
            }
            return iterativeValue;
        }, 0)
    }

    function displayWinner(player1,player2){
        const Winner = document.querySelector(".Winner-Text")
        Winner.classList.add('winner');
        GameBoard.checkGameBoardWinner() === 'X' ? Winner.textContent = `${player1.playerName} is The Winner` : Winner.textContent = `${player2.playerName} is The Winner`;
        CreatePlayer.prototype.bIsWinnerPresent = true;
    }

    return {
        updateDisplayGameBoard,
        removeGameBoardListener,
        displayWinner
    }
})();


function gameFlow(element)
{
    let Name1, Name2;
    document.querySelector("#PlayerOne").value === ""? Name1 = "Player 1": Name1 = document.querySelector("#PlayerOne").value;
    document.querySelector("#PlayerTwo").value === ""? Name2 = "Player 2": Name2 = document.querySelector("#PlayerTwo").value;
    
    const player1 = new CreatePlayer(Name1,'X');
    const player2 = new CreatePlayer(Name2,'O');

    let indexOneValue;
    let indexTwoValue;
    [indexOneValue, , indexTwoValue] = element.target.dataset.indexNumber;
    indexOneValue = parseInt(indexOneValue);
    indexTwoValue = parseInt(indexTwoValue);
    //Checks for click on an index which has X or O
    if (GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'X' || GameBoard.getGameBoardIndex(indexOneValue, indexTwoValue) === 'O')
    {
        return;
    }
    if (CreatePlayer.prototype.bIsPlayerTurn)
    {
        PlayerTurn(player1,player2,indexOneValue,indexTwoValue);
    }
    else
    {
        PlayerTurn(player1,player2,indexOneValue,indexTwoValue);
    }
    if (NumberOfTurnsData.checkTurns() > 4 && GameBoard.checkGameBoardWinner())
    {
        displayGameBoardWeb.removeGameBoardListener();
        displayGameBoardWeb.displayWinner(player1,player2)        
    }
    if (NumberOfTurnsData.checkTurns() > 8)
    {
        document.querySelector(".Winner-Text").textContent = "Game is a Draw"
    }
    NumberOfTurnsData.updateTurns();
}


function PlayerTurn(player1,player2,indexOneValue,indexTwoValue){
    if(CreatePlayer.prototype.bIsPlayerTurn){
        GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player1.value);
        displayGameBoardWeb.updateDisplayGameBoard();
        document.querySelector(".Player-Turn").textContent = `${player2.playerName}'s Turn`;
        document.querySelector(".Player-Turn").classList.remove("boardCellUpdatedBackgroundX");
        document.querySelector(".Player-Turn").classList.add("boardCellUpdatedBackgroundO");
        CreatePlayer.prototype.bIsPlayerTurn = false;
        return;
    }
    GameBoard.setValueGameBoard(indexOneValue, indexTwoValue, player2.value);
        displayGameBoardWeb.updateDisplayGameBoard();
        document.querySelector(".Player-Turn").textContent = `${player1.playerName}'s Turn`;
        CreatePlayer.prototype.bIsPlayerTurn = true;
        document.querySelector(".Player-Turn").classList.remove("boardCellUpdatedBackgroundO");
        document.querySelector(".Player-Turn").classList.add("boardCellUpdatedBackgroundX");
}
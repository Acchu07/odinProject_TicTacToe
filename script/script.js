function CreatePlayer(playerName, value){
    this.playerName = playerName;
    this.value = value;
}

const GameBoard = (function (){
    const gameBoard = [];
    while(gameBoard.length < 3){
        const row = new Array(3).fill("Empty");
        gameBoard.push(row);
    }
    
    function getGameBoard(indexFirst,indexSecond){
        return gameBoard[indexFirst][indexSecond];
    }

    function setValueGameBoard(indexFirst,indexSecond,value){
        // Put a condition to check if value in place of mentioned indexes or else i will be able to overwrite values
        gameBoard[indexFirst][indexSecond] = value;
        displayGameBoard();
    }

    function displayGameBoard(){
        console.log(gameBoard);
    }
    
    return {
        getGameBoard,
        setValueGameBoard,
        displayGameBoard
    }

})();

function newGame(){
    playGame();
}

function playGame(){
    const player1 = new CreatePlayer("Player1","X") //prompt("Enter Name","test")
    const player2 = new CreatePlayer("Player2", "O");    
    GameBoard.displayGameBoard();
    GameBoard.setValueGameBoard(0,1,player1.value)
}

function displayGameBoard(){

}

newGame();
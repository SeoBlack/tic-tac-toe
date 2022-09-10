//player factory.
const createPlayer = (name,role) =>{
    return {name,role};
}

//gameBoard
const gameBoard = (() => {

    //board array
    let gameBoardBoxes = []
    for(let i = 1; i < 10 ; i++){
        gameBoardBoxes.push('');
    }
    
    //displaying boxes
    boxesContainer = document.querySelector(".gameboard");
    gameBoardBoxes.forEach((box , index ) => {
        const newBox = document.createElement("div");
        newBox.className = 'box';
        boxesContainer.appendChild(newBox);
    });

    //adding event listeners on each box
    Array.from(boxesContainer.children).forEach((box,index) => {
        box.addEventListener('click',()=>{
            //display acive player marker
            box.classList.add(game.activePlayer.role);
            box.setAttribute('data',game.activePlayer.role);
            //update array value of the  active player choice
            gameBoardBoxes[index] = game.activePlayer.role;
            //remove event listener form the marked index
            
            box.style.ponterEvents = 'none';
            //update remaining spots 
            game.remainingSpots -= 1;
            //check winner
            game.checkWinner();
            //check remaining spots
            if(!game.winnerDeclared){
                if(game.remainingSpots > 0){
                    game.alertNextPlayer();
                    game.nextPlayer();
                }else if (game.remainingSpots == 0){
                    game.declareTie();
                }
            }
            else{
                
            }

        })
    })
    return {gameBoardBoxes};

})();


//game Object
const game = (() => {
    
    //create players
    const playerOne = createPlayer("player 1","police");
    const playerTwo = createPlayer("player 2","thieve");

    //starting point
    let activePlayer   = playerOne;
    let winnerDeclared = false;
    remainingSpots     = 9;

    //selectors
    let info = document.querySelector(".result");

    //winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    //check winner 
    function checkWinner(){
        winningAxes.forEach((item,index) => {
            if(gameBoard.gameBoardBoxes[item[0]] === this.activePlayer.role && gameBoard.gameBoardBoxes[item[1]] === this.activePlayer.role && gameBoard.gameBoardBoxes[item[2]] === this.activePlayer.role){
                info.textContent = `${this.activePlayer.role} wins!`;
                this.winnerDeclared = true;
                //stopping the event listeners.
                Array.from(document.querySelector(".gameboard").children).forEach((box) => {
                    newBox = box.cloneNode(true);
                    box.parentNode.replaceChild(newBox,box);
                })
            }
        })
    }
    function alertNextPlayer(){
        this.activePlayer === playerTwo ? info.textContent= "Police Make A Move" : info.textContent = "Thieve Make A Move";

    }
    function nextPlayer(){
        this.activePlayer === playerOne ? this.activePlayer=  playerTwo : this.activePlayer = playerOne;
    }
    //declare tie
    function declareTie(){
        info.textContent = "Tie Game!";
    };

    return{
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };

})();
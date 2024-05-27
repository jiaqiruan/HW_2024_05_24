import React, {useState} from 'react'
import GameComponent from './GameComponent'

const initalGame = ['','','','','','','','',''];

export default function GameApp() {
    //player's turn, true = player1, false = player2
    const [turn,setTurn] = useState(true);
    //managing game state, using 1d array to represent 2d tic tac toe
    const [game,setGame] = useState([...initalGame]);
    //managing game stage, progress, win, lose, draw
    const [stage,setStage] = useState("progress");

    const resetGame = ()=>{
        setGame([...initalGame]);
        setTurn(true);
        setStage("progress");
    }

    //logic for click game component
    const handleGameComponentClick = (indexClick)=>{
        if(stage==='progress'){
            const newGame = game.map((item,index)=>{
                if(index===indexClick){
                    //if click item is empty
                    if(game[index]===''){
                        //then set value
                        setTurn(!turn);
                        return (turn ? "O":"X");
                    }else{
                        //else ignore
                        return item;
                    }
                }else{
                    return item;
                }
            });
            setGame(newGame);
            const result = checkWinning(newGame);
            //console.log((turn ? "O": "X"),result);
            if(result==='progress'){
                //do nothing
            }else{
                let resultString = '';
                if(result==='win'){
                    resultString += "Player";
                    resultString += " ";
                    resultString += (turn ? "O": "X");
                    resultString += " ";
                    resultString += result;
                }else{
                    resultString += 'draw';
                }
                setStage(resultString);
            }
        }
    };

    return (
        <div>
            <header>Tic Tac Toe</header>
            <div>
                {stage === 'progress' ? (<span>CurrentPlayer: {turn ? "O" :"X" }</span>) : <span>{stage}</span>}
            </div>

            <br/>
            <button onClick={()=>resetGame()}>Reset!</button>
            <br/>
            <br/>
            <div className='game-container'>
                {game.map((item,index)=>{
                    return <GameComponent key={index} handleClick={()=>handleGameComponentClick(index)} result={item}/>
                })}
            </div>
        </div>
    )
}
function checkWinning(array){
    const board = Array.from({ length: 3 }, (_, i) => array.slice(i * 3, i * 3 + 3));
    // Checking rows
    for (let i = 0; i < 3; i++) {
        const a = board[i][0];
        const b = board[i][1];
        const c = board[i][2];

        if (a !== '' && a === b && b === c) {
            return 'win';
        }
    }

    // Checking columns
    for (let i = 0; i < 3; i++) {
        const a = board[0][i];
        const b = board[1][i];
        const c = board[2][i];

        if (a !== '' && a === b && b === c) {
            return 'win';
        }
    }

    // Left Top to Bottom right diagonal
    const a = board[0][0];
    const b = board[1][1];
    const c = board[2][2];

    if (a !== '' && a === b && b === c) {
        return 'win';
    }

    // Right Top to Left bottom diagonal
    const d = board[0][2];
    const e = board[1][1];
    const f = board[2][0];

    if (d !== '' && d === e && e === f) {
        return 'win';
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = board[i][j];
            if (square === '') return 'progress';
        }
    }

    return 'draw';

}

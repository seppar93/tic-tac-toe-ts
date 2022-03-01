import React, { useEffect, useState } from 'react';
import Square from '../components/Square';

export type Player = "X" | "O" | "DRAW" | null
const calculateWinner = (squares: Player[]) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
        return null;
    }
}

export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    );
    const [winner, setWinner] = useState<Player>(null);

    const setSquareValue = (index: number) => {
        // set the value of the square to the current player
        const newData = squares.map((value, idx) => {
            if (index === idx) {
                return currentPlayer;
            }
            return value;
        });
        setSquares(newData);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };
    const reset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(
            Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
        )
    }

    // detemine if there was a winner on click
    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }
        if (!w && !squares.filter((square) => !square).length) {
            // any square that dosnt have a current player in it
            setWinner("DRAW")
        }


    }, [squares])




    return (
        <div>
            Current Player is {currentPlayer}
            {winner && winner !== 'DRAW' && <p>Congrats{winner}</p>}
            {winner && winner === 'DRAW' && <p>It is a draw!</p>}
            <div className='grid'></div>
            {Array(9)
                .fill(null)
                .map((_, idx) => {
                    // dont use index as they may change
                    return (
                        <Square
                            key={idx}
                            onClick={() => setSquareValue(idx)}
                            value={squares[idx]}
                            winner={winner}
                        />
                    );
                })}
            <button className='rest' onClick={reset}>Reset</button>
        </div>
    );
};

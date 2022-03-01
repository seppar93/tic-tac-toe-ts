import React, { useState } from 'react'
import Square from '../components/Square'

export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random()* 1) === 1 ? 'X' : 'O'
    )
    const [winner, setWinner] = useState(null)

    const setSquareValue = (index) => {
        // set the value of the square to the current player
        const newData = squares.map((value, idx) => {
            if(index === idx) {
                return currentPlayer
            }
            return value;
        })
        setSquares(newData)
        setCurrentPlayer(currentPlayer === "X" ? "O": "X")
    }
    
  return (
    <div>Current Player is {currentPlayer}
    {Array(9).fill(null).map((_, idx) => {
        // dont use index as they may change
        return <Square key={idx}
        onClick={() => setSquareValue(idx) }
        value={squares}
        winner={winner}
        />
    })
    }
    
    
    
    
    </div>
  )
}

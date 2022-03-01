import React from 'react'
type Player = "X" | "O"| null
type SquareProps = {
    value :Player;
    winner:Player;
    onClick: () => void
}

export default function Square({value, onClick, winner}: SquareProps) {
    if(!value) {
        return <button className='square' onClick={onClick} disabled={Boolean(winner)}/>
    }
  return (
      <button className={`square square_${value.toLocaleLowerCase()}`} disabled>{value}</button>
  )
}

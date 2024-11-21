import React from 'react'

interface DominoProps {
    dominoTop: number,
    dominoBottom: number
}

function DominoComponent({ dominoTop, dominoBottom}: DominoProps) {
  return (
    <div className="border-black border-2 grid grid-cols-1 px-2 py-1">
      <p>{dominoTop}</p>
      <p>-</p>
      <p>{dominoBottom}</p>
    </div>
  )
}

export default DominoComponent
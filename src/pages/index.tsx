import {FormEvent, useState} from "react"
import DominoComponent from "@/components/DominoComponent"
import dominoSource from "../utils/source.json"

function Dominoes() {
  const [dominoes, setDominoes] = useState<number[][]>(dominoSource)
  const [inputNumber, setInputNumber] = useState<number|"">("")
  
  function findDoubles(dominoes:number[][]){
    const doubleNumbers: number[][] = []
    dominoes.forEach((domino) => {
      if (domino[0] === domino[1]) {
        doubleNumbers.push(domino)
      }
    })
    return doubleNumbers.length
  }

  function handleSortAsc(){
    const ascSortedDominoes = dominoes.slice().sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
    setDominoes(ascSortedDominoes)
  }

  function handleSortDesc(){
    const descSortedDominoes = dominoes.slice().sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).reverse();
    setDominoes(descSortedDominoes)
  }

  function handleFlip(){
    const flippedDominoes = dominoes.map((domino) => {
      return [domino[1], domino[0]]
    })
    setDominoes(flippedDominoes)
  }

  function handleRemoveDupes() {
    const sortedDominoes = dominoes.map((domino) =>
      domino.slice().sort().join(",")
    );
  
    const uniqueDominoes = dominoes.filter((domino) => {
      const sortedDomino = domino.slice().sort().join(",");
      return sortedDominoes.indexOf(sortedDomino) === sortedDominoes.lastIndexOf(sortedDomino);
    });
    setDominoes(uniqueDominoes);
  }
  
  function handleReset(){
    setDominoes(dominoSource)
  }

  function handleRemoveTotalNumber(e: FormEvent) {
    e.preventDefault()
    if (inputNumber !== "") {
      const remainingDominoes = dominoes.filter((domino) => {
        const totalNumber = domino[0]+domino[1];
        return totalNumber !== inputNumber
      })
      setDominoes(remainingDominoes)
      setInputNumber("")
    }
  }

  return (
    <div className="bg-white w-screen h-screen flex flex-col justify-center items-center text-slate-800">
      <div className="rounded-md">
        <h1 className="text-2xl font-bold text-left text-gray-800">Dominoes</h1>
        <div className="rounded-md bg-gray-50 border-2 text-black p-2">
          <h1 className="font-bold">Source</h1>
          <div className="flex flex-row">
          {dominoes.map((domino, index:number) => {
            return <p
            key={index}>[{domino.join(",")}]</p>
          })}
          </div>
        </div>
        <div className="rounded-md bg-gray-50 border-2 text-black my-1 p-2">
          <h1 className="font-bold">Double Numbers</h1>
          <p>{findDoubles(dominoes)}</p>
        </div>
        <div className="flex flex-row gap-4 my-4">
          {dominoes.map((domino, index:number) => {
            return (
              <DominoComponent 
              key={index}
              dominoTop={domino[0]}
              dominoBottom={domino[1]}
              />
            )
          })}
        </div>
        <div className="flex flex-row my-3">
          <button
          onClick={handleSortAsc}
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2">
            Sort (ASC)
          </button>
          <button
          onClick={handleSortDesc} 
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 mx-2">
            Sort (DESC)
          </button>
          <button
          onClick={handleFlip} 
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2">
            Flip
          </button>
          <button
          onClick={handleRemoveDupes} 
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 mx-2">
            Remove Dupes
          </button>
          <button
          onClick={handleReset} 
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2">
            Reset
          </button>
        </div>
        <form
        onSubmit={handleRemoveTotalNumber}
        >
          <input
          type="number"
          placeholder="Input Number"
          className="rounded-sm border-2 p-2 w-full"
          value = {inputNumber}
          onChange={(e) => {setInputNumber(Number(e.target.value))}}
          />
          <button 
          className="rounded-md bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 my-1">
            Remove
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dominoes
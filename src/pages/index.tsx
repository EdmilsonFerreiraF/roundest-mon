import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'

const Home: NextPage = () => {
  const [pokemonIDs, setPokemonIDs] = useState<number[]>([])

  useEffect(() => {
    const [first, second] = getOptionsForVote()

    setPokemonIDs([first, second])
  }, [])

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: pokemonIDs[0] }])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: pokemonIDs[1] }])

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    setPokemonIDs(getOptionsForVote())
  }

  const btnClass = "inline-flex items-center px-2.5 py=1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center">
      <div
        className="text-2xl text-center">
        Which Pokémon is Rounded?
      </div>
      <div
        className="p-2"></div>
      <div
        className="border rounded p-8 justify-between max-w-2xl flex items-center">
        <div
          className="w-64 h-64 flex flex-col items-center">
          <img
            className="w-full"
            src={
              firstPokemon.data?.sprites.front_default as
              string
            } alt="" />
          <p
            className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </p>
          <button
            onClick={() => {
              voteForRoundest(pokemonIDs[0])
            }}
            className={btnClass}>
            Rounder
          </button>
        </div>
        <div
          className="p-8">
          Vs
        </div>
        <div
          className="w-64 h-64 flex flex-col items-center">
          <img
            className="w-full"
            src={
              secondPokemon.data?.sprites.front_default as
              string
            } alt="" />
          <p
            className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </p>
          <button
            onClick={() => {
              voteForRoundest(pokemonIDs[1])
            }}
            className={btnClass}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

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

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Which Pokémon is Rounded?
      </div>
      <div className="p-2"></div>
      <div className="border rounded p-8 justify-between max-w-2xl flex items-center">
        <div className="w-64 h-64 flex flex-col">
          <img
          className="w-full"
           src={firstPokemon.data?.sprites.front_default as string} alt="" />
           <p className="text-xl text-center capitalize mt-[-2rem]">{firstPokemon.data?.name}</p>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img
          className="w-full"
           src={secondPokemon.data?.sprites.front_default as string} alt="" />
           <p className="text-xl text-center capitalize mt-[-2rem]">{secondPokemon.data?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Home

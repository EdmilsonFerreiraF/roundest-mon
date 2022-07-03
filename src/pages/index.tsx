import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [pokemonIDs, setPokemonIDs] = useState<number[]>([]);
  // const [firstPokemon, setFirstPokemon] = useState({});
  // const [secondPokemon, setSecondPokemon] = useState({});

  useEffect(() => {
    const [first, second] = getOptionsForVote();

    setPokemonIDs([first, second]);
  }, []);

  const firstPokemon = trpc.useQuery([
    "get-pokemon-by-id",
    { id: pokemonIDs[0] },
  ]);

  const secondPokemon = trpc.useQuery([
    "get-pokemon-by-id",
    { id: pokemonIDs[1] },
  ]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === pokemonIDs[0]) {
      voteMutation.mutate({
        votedFor: pokemonIDs[0],
        votedAgainst: pokemonIDs[1],
      });
    } else {
      voteMutation.mutate({
        votedFor: pokemonIDs[1],
        votedAgainst: pokemonIDs[0],
      });
    }

    setPokemonIDs(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounded?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 justify-between max-w-2xl flex items-center">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(pokemonIDs[0])}
              />
              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(pokemonIDs[1])}
              />
            </>
          )}
      </div>
      <div className="absolute bottom-0 w-full text-xl text-center pb-2">
        <a href="https://github.com/EdmilsonFerreiraF/roundest-mon">Github</a>
      </div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  const btnClass =
    "inline-flex items-center px-2.5 py=1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  return (
    <div className="flex flex-col items-center">
      <Image
        className="w-64 h-64"
        src={props.pokemon.sprites.front_default as string}
        width={256}
        height={256}
        alt=""
      />
      <p className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </p>
      <button
        onClick={() => {
          props.vote();
        }}
        className={btnClass}
      >
        Rounder
      </button>
    </div>
  );
};

export default Home;

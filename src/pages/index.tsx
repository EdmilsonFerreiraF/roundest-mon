import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["hello", {text: "Edmilson"}])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data) {
    return <div>{data.greeting}</div>
  }
  
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      Hello world
      <div className="text-2xl text-center">
        Which Pokémon is Rounded?
      </div>
      <div className="p-2"></div>
      <div className="border rounded p-8 justify-between max-w-2xl flex items-center">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  )
}

export default Home

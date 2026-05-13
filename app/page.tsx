"use client";
import Image from "next/image";
import pokelogo from "../public/pokelogo.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import { APIResourceList, NamedAPIResource, Pokemon } from "pokedex-promise-v2";
import { Fredoka } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import Pokedex from "pokedex-promise-v2";
import { id } from "zod/locales";

async function AllPokeData() {
  const P = new Pokedex();
  let data;
  data = await P.getPokemonsList({ limit: 20, offset: 0 });
  let detailedData = await Promise.all(
    data.results.map(async (curr: NamedAPIResource) => {
      return await P.getPokemonByName(curr.name);
    }),
  );
  console.log(detailedData);
  return detailedData;
}

const page = () => {
  let { isLoading, isError, data, error } = useQuery<Pokemon[]>({
    queryKey: ["pokemon"],
    queryFn: AllPokeData,
    staleTime: 1000 * 60 * 10,
  });

  if (isError || error) return <div>"Something Went Wrong"</div>;

  return (
    <div className="grid grid-rows-[1fr_5fr_1fr] h-screen gap-4">
      <div className="border border-zinc-500 rounded-3xl text-white flex justify-center align-middle gap-4 font-bold text-8xl p-4">
        <Image src={pokelogo} alt="logo" width={150} height={100} />
        <p className="py-10">PokeDex</p>
      </div>

      <div className="text-white p-7 rounded-3xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color="#f1f1ff" speedMultiplier={1} />
          </div>
        ) : (
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-9
      "
          >
            {data?.map((curr: any) => {
              let hex = Math.floor(Math.random() * 0xffffffff)
                .toString(16)
                .padEnd(8, "0");
              return (
                <div
                  key={curr.name}
                  className="
              bg-zinc-800
              p-10
              m-4
              gap-3
              rounded-2xl
              shadow-lg
              border
              border-zinc-700
              flex
              justify-center
              items-center
              min-h-30
              hover:scale-105
              transition
            "
                >
                  <div className={`flex flex-col ${fredoka.className}`}>
                    <Image
                      src={curr.sprites.other["official-artwork"].front_default}
                      height={300}
                      width={300}
                      alt={"Pokemon Image"}
                    ></Image>
                    <p className="text-4xl font-bold capitalize flex justify-center ">
                      {curr.name}
                    </p>
                    <div className="flex justify-start">
                      <p className="text-xl font-semibold flex justify-evenly">
                        Abilities :
                      </p>

                      {curr.abilities.map((data: APIResourceList) => {
                        let current = data.ability.name;
                        return (
                          <div key={current}>
                            <div
                              key={current}
                              className="flex justify-center capitalize text-xl font-light px-2 border-l-white"
                            >
                              {current}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Types */}
                    {
                      <div
                        key={curr.id}
                        className="flex justify-start p-2 text-xl font-light m-2 capitalize gap-2 "
                      >
                        <p>
                          Type : {curr.types[0].type.name} ,{" "}
                          {curr.types[1]?.type.name} {curr.types[2]?.type.name}
                        </p>
                      </div>
                    }

                    <button
                      style={{ backgroundColor: `#${hex}` }}
                      className="
    rounded-2xl
    p-4
    flex
    justify-center
    items-center
    text-4xl
    text-white
    hover:scale-125
    cursor-pointer
    transition
  "
                    
                    >
                      Rate this Pokemon
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border border-white text-white h-35">Footer</div>
    </div>
  );
};

export default page;

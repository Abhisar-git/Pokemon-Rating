"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import pokelogo from "../public/pokelogo.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import { AllPokeData } from "@/actions/Apicall";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const page = () => {
  const [pokemon, setpokemon] = useState<any[]>([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    // async function fetchData() {
    //   setisloading(true);
    //   const data = await (
    //     await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    //   ).json();
    //   setpokemon(data);
    //   setisloading(false);
    // }
    AllPokeData().then((res) => {
      setpokemon(res);
      setisloading(false);
    });
  }, []);
  return (
    <div className="grid grid-rows-[1fr_5fr_1fr] h-screen gap-4">
      <div className="border border-zinc-500 rounded-3xl text-white flex justify-center align-middle gap-4 font-bold text-8xl p-4">
        <Image src={pokelogo} alt="logo" width={150} height={100} />
        <p className="py-10">PokeDex</p>
      </div>

      <div className="text-white p-7 rounded-3xl">
        {isloading ? (
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
            {pokemon.map((curr) => {
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

                      {curr.abilities.map((data) => {
                        let current = data.ability.name;
                        return (
                          <>
                            <div
                              key={current}
                              className="flex justify-center capitalize text-xl font-light px-2 border-l-white"
                            >
                              {current} ,
                            </div>
                          </>
                        );
                      })}
                    </div>
                    {/* Types */}
                    <div className="p-2 text-xl font-bold m-2 ">
                      <p>Type : </p>
                      {}
                    </div>
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

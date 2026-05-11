import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
export async function PokemonData(name : string){
    
}

export async function AllPokeData(){
    
    let data;
    data = await P.getPokemonsList({limit : 200 , offset:0});
    let detailedData = await Promise.all(
        data.results.map(async (curr : any) => {
            return await P.getPokemonByName(curr.name);
        })
    )
    console.log(detailedData);
    return detailedData;
};




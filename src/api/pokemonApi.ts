import {axiosClient} from './axiosClient' 

class pokemonApi {
    getData<T = String>(id:T):Promise<any>{
        let url=`https://pokeapi.co/api/v2/pokemon/${id}/`;
        return axiosClient.get(url);
    }
    async getPokemon(quantityPokemon:number = 10): Promise<object[]> {
        let pokemon: Array<object> = [];
        for (let i = 1; i <= quantityPokemon; i += 1) {
          let { data: pokemonData } = await this.getData<number>(i);
          pokemon = [...pokemon,{ id: pokemonData.id, name: pokemonData.name, image: pokemonData.sprites.front_shiny }];
        }
        let pokemonx2: Array<object> = [...pokemon, ...pokemon];
        pokemonx2.sort(() => Math.random() - 0.5); 
        return pokemonx2;
    }
}

export default new pokemonApi;
import pokemonApi from "../api/pokemonApi";
import GamePlay from "../components/GamePlay";
import { $ } from "../utils";

class Play{
    async render(){
        const name = localStorage.getItem('userName');
        const data = await pokemonApi.getPokemon();
        return /*html*/`
        <div class="text-white text-center mt-3 w-25 mx-auto border border-1">Hello: ${name} / Điểm: <span id="score">0</span>
            <p style="margin: 0">Your Turn: <span id="turn">5</span></p>
        </div>
        <div class="container mt-0 play">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5" id="show">
              ${GamePlay.boxPokemon(data)}
            </div>
        </div>
        <div class="container mt-3">
            <button class="btn btn-danger ms-5" id="back">Back</button>
            <button class="btn btn-primary float-end me-5" id="reset">Reset</button>
        </div>
        `
    }
    async afterRender(){
        // const data = await pokemonApi.getPokemon();
        GamePlay.play();
        GamePlay.back();
        GamePlay.reset();
    }
}

export default new Play;
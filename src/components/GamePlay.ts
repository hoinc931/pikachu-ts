import pokemonApi from "../api/pokemonApi";
import { $ } from "../utils";


class GamePlay{
    abc:number;
    boxPokemon<T extends object[]>(data:T): string{
        let box: string = "";
        data.map( (pokemon: any, index) => {
            box += `
                <div class="col mt-3 box" id="box-${index}" data-id="${pokemon.id}">
                    <div class="card">
                        <img class="card-img-top in-${index}" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh81Uvk72jkBBff8BNymcaNJdy0GKkk1dKNDBi0WPBahGZouOxyI77flo3YNiJR5wWtK0&usqp=CAU" link="${pokemon.image}" data-id="${pokemon.id}" alt="${pokemon.name}">
                    </div>
                </div>
            `
        }).join("")
        return box;
    }

    play(): void{
        let checkRemove:number = 0;
        let clicked:number = 0;
        let points: number = 0;
        let saveId:Array<number> = []
        let saveIndex:Array<number> = [];

        let saveFalse:number = 5;

        $('.box').forEach((elements, index) => {
            elements.addEventListener('click', async ()=>{
                const id = Number(elements.dataset.id);
                const att = imgIn(index).getAttribute("clicked");
                if(!att){
                    imgIn(index).setAttribute("clicked", id);
                    imgIn(index).setAttribute("src", imgIn(index).getAttribute("link"));
                    //
                    saveId = [...saveId, id];
                    saveIndex = [...saveIndex, index];
                    clicked++;
                    
                }else{
                    imgIn(index).removeAttribute("clicked")
                    imgIn(index).setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh81Uvk72jkBBff8BNymcaNJdy0GKkk1dKNDBi0WPBahGZouOxyI77flo3YNiJR5wWtK0&usqp=CAU");
                    saveId.pop();
                    saveIndex.pop();
                    clicked--;
                }
                if(clicked == 2){
                    $('.box').forEach(element => {
                        element.style.pointerEvents = 'none'
                    });
                }
                setTimeout(function(){
                    if(clicked >= 2){
                        if(saveId[0] == saveId[1]){
                            $(`#box-${saveIndex[0]}`).style.visibility = "hidden";
                            $(`#box-${saveIndex[1]}`).style.visibility = "hidden";
                            imgIn(saveIndex[0]).removeAttribute("clicked")
                            imgIn(saveIndex[1]).removeAttribute("clicked")
                            points += 1000;
                            checkRemove++;
                            saveFalse++;
                            if(checkRemove == 10){
                                if(saveFalse > 0){
                                    points = points + saveFalse * 500;
                                }
                                alert(`Chúc mừng bạn đã đạt: ${points}`);
                                window.location.reload()
                            }
                        }
                        else{
                            chooseFalse(saveIndex[0])
                            chooseFalse(saveIndex[1])
                            points -= 200;
                            saveFalse--;
                        }
                        saveIndex = []
                        saveId = [];
                        clicked = 0;
                    }
                    $('#turn').innerHTML = saveFalse;
                    
                    points = points < 0 ? 0 : points;
                    $('#score').innerText = points;

                    if(saveFalse == 0){
                        let conformed = confirm(`Game Over!! Your points: ${points}`)
                        if(conformed == true){
                            window.location.reload();
                        }
                        else{
                            window.location.hash = '';
                        }
                    }
                    $('.box').forEach(element => {
                        element.style.pointerEvents = 'auto';
                    });
                }, 800)
                
            })
        })
        
        const imgIn = (index) => {
            return $(`.in-${index}`)
        }
        const chooseFalse = (index) => {
            imgIn(index).removeAttribute("clicked")
            imgIn(index).setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh81Uvk72jkBBff8BNymcaNJdy0GKkk1dKNDBi0WPBahGZouOxyI77flo3YNiJR5wWtK0&usqp=CAU");
        }
    }

    //method reset
    reset(): void{
        $('#reset').addEventListener('click', e => {
            e.preventDefault();
            let prom = confirm("Bạn có chắc là muốn chơi lại từ đầu không??");

            if(prom == true){
                window.location.reload()
            }
        })
    }

    // method back
    back(){
        $('#back').addEventListener('click', e => {
            e.preventDefault();
            let prom = confirm("Bạn có chắc là muốn quay lại không??");

            if(prom == true){
                window.location.hash = ''
            }
        })
    }

    // method chúc mừng (congratulation)
    congratulation(points: number): any{
        return `Chúc mừng bạn đã đạt: ${points} điểm!`
    }
}

export default new GamePlay;
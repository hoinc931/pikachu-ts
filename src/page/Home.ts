import { $ } from "../utils";

class Home{
    render(){
        return /*html*/`
        <div class="home-page">
            <h1 class="text-center text-white">POKEMON GAME</h1>
            <h3 class="text-center text-white">Hello Player!!</h3>

            <div class="w-50 text-center position-absolute top-50 start-50 translate-middle row">
                <div class="col">
                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter your name...">
                    <span class="text-danger text-start fs-4 bg-light rounded-pill mt-4"></span>
                </div>
                <div class="col-1">
                    <button class="btn btn-light text-center">Play</button>
                </div>
            </div>
        </div>`
    }
    afterRender(){
        $('button').addEventListener('click', e => {
            e.preventDefault();
            const name:string = $('input').value;
            this.checkName(name)
        })
    }
    checkName(name: string){
        if(!name){
            // $('span').innerHTML = "";
            $('.text-danger').innerText = "Name is require...";
            $('.text-danger').style = 'padding: 0 10px 0 10px';
            $('input').style.border = "1px solid red";
            $('input').focus();
        }else if(name.length <= 5 || name.length >= 32){
            $('.text-danger').innerText = "Name must contains least 5 charactors";
            $('.text-danger').style = 'padding: 0 10px 0 10px';
            $('input').style.border = "1px solid red";
            $('input').focus();

        }else{
            $('span').innerHTML = "";
            localStorage.setItem("userName", name);
            window.location.hash = '/playgame';
        }
    }
}

export default new Home;
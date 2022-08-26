import Error404Page from "./page/error404Page";
import Home from "./page/Home";
import Play from "./page/Play";
import { $, parserRequetsUrl } from "./utils"

const route = {
    '/': Home,
    '/playgame': Play
}

const router = async () => {
    const {resource, id} = parserRequetsUrl();
    const parseUrl = (resource ? `/${resource}` : '/') + (id ? '/:id' :  '');
    const page = route[parseUrl] ? route[parseUrl] : Error404Page;
    document.querySelector('.main-content').innerHTML = await page.render();

    if(page.afterRender){await page.afterRender()}
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
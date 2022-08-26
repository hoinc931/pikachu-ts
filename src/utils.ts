export const parserRequetsUrl = () => {
    const url = window.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2]
    }
}
export const $ = (selector: string) => {
    const elements: any = document.querySelectorAll(`${selector}`) ;
    return elements.length === 1 ? elements[0] : [...elements];
}

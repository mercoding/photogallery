import * as pictures from './pictures.js';
import * as language from './language.js';

export let currentType = '', portrait = true;

export async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        document.file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(document.file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function setContent(name) {
    var main = document.getElementById("main");
    main.removeAttribute("w3-include-html");
    main.setAttribute("w3-include-html", "./templates/" + name + ".html");
}


export function currentContent(name) {
    isMenuOpenOnSmallScreenSize();
    currentType = name;
    language.getLanguage();
    language.checkLanguage();
    checkOrientation();
    setContent(name);
    includeHTML();
    includeHTML().then(res => {
        if (name == 'pictures') {
            pictures.loadPictures();
        }
    }).catch(err => console.log(err));
}


function checkOrientation() {
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
        portrait = e.matches;
    });
}


window.currentContent = currentContent;
export default {}
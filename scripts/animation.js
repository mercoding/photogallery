import * as pictures from './pictures.js';
import * as content from './content.js';
import * as vector from './vector.js';
import * as resize from './resize.js';


let nextImage = 0, imagesCopy, count = 0, portrait = true;


function checkImageArray(images, i) {
    if (i > images.length - 1)
        return 0;
    else if (i < 0)
        return images.length - 1;
    return i;
}


function getPos(el) {
    // yay readability
    for (var lx = 0, ly = 0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly };
}


export function start(images, i) {
    imagesCopy = images;
    let imageId = document.getElementById('image' + i);
    let pos = getPos(imageId);
    let start = new vector.Vector(pos.x, pos.y);
    let end = new vector.Vector((window.innerWidth / 2 - imageId.offsetWidth / 2), (window.innerHeight / 2 - imageId.offsetHeight / 2) + window.scrollY);
    let moveTo = end.subtract(start);

    document.querySelector('.imgcontainer').style.setProperty('--moveToPosY', `${moveTo.y}px`);
    document.querySelector('.imgcontainer').style.setProperty('--moveToPosX', `${moveTo.x}px`);
    imageId.classList.add('pictureTransformToCenter');

    Promise.all(imageId.getAnimations().map((animation) => animation.finished)).then(
        () => {
            content.currentContent('bigpictureview');
            content.includeHTML().then(res => {
                loadSlidePictures(images, i);
                setNavigation(portrait);
            }).catch(err => console.log(err));
        });
}


function loadSlidePictures(images, index) {
    if (!document.querySelector('.mask')) return;
    count = index;
    content.includeHTML().then(res => {
        resize.determineAvailableSpace();
        for (let i = 0; i < images.length; i++) {
            if (i === count) {
                document.querySelector('.mainGrid').innerHTML += /*html*/`
                    <div id="image${i}" class="gridImgBox">
                        <img src="pictures/${images[i]}" alt="Image${i}">
                    </div>  
                `;
            }
            else {
                document.querySelector('.mainGrid').innerHTML += /*html*/`
                    <div id="image${i}" class="gridImgBox slides">
                        <img src="pictures/${images[i]}" alt="Image${i}">
                    </div>  
                `;
            }
        }
        setNavigation(portrait);
    }).catch(err => console.log(err));
}


export function prev(images, i) {
    let currentImg = document.getElementById(`image${count}`);
    currentImg.classList.add("slides");
    let lastIndex = checkImageArray(images, count - 1);
    document.getElementById(`image${lastIndex}`).classList.add("slides");
    document.getElementById(`image${lastIndex}`).classList.remove("animationToLeft");
    count -= 1;
    count = checkImageArray(images, count);

    let nextImg = document.getElementById(`image${count}`);
    currentImg.setAttribute('z-index', '999');
    nextImg.classList.remove("slides");
    nextImg.classList.add("animationToLeft");

    currentImg.classList.add("slides");
    currentImg.classList.remove("animationToLeft");
}


export function next(images, i) {
    let currentImg = document.getElementById(`image${count}`);
    currentImg.classList.add("slides");
    let lastIndex = checkImageArray(images, count - 1);
    document.getElementById(`image${lastIndex}`).classList.add("slides");
    document.getElementById(`image${lastIndex}`).classList.remove("animationToRight");
    count += 1;
    count = checkImageArray(images, count);

    let nextImg = document.getElementById(`image${count}`);
    currentImg.setAttribute('z-index', '999');
    nextImg.classList.remove("slides");
    nextImg.classList.add("animationToRight");

    currentImg.classList.add("slides");
    currentImg.classList.remove("animationToRight");
}


export function loadPictures(images) {
    document.getElementById(`${Sides[index]}Side`).setAttribute('src', `pictures/${images[nextImage]}`);
    swipe.listener();
}


function setNavigation(portrait) {
    if (!document.querySelector('.mask')) return;
    document.querySelector('.headerGrid').innerHTML = '';
    document.querySelector('.leftGrid').innerHTML = '';
    document.querySelector('.rightGrid').innerHTML = '';
    document.querySelector('.footerGrid').innerHTML = '';
    if (content.portrait && portrait) {
        document.querySelector('.footerGrid').innerHTML += /*html*/`
                <img onclick="swipeBackwardsImages()" class="left-arrow" src="./img/linker-pfeil-white.png" alt="Forward Button">
                <img onclick="closeImage()" class="close" src="./img/schaltflache-loschen-white.png" alt="Close Button">
                <img onclick="swipeForwardImages()" class="right-arrow" src="./img/rechter-pfeil-white.png" alt="Backward Button">
        `;
        document.querySelector('.close').style.setProperty('margin', '0 0 0 0');
    }
    else {
        document.querySelector('.leftGrid').innerHTML = /*html*/`<img onclick="swipeBackwardsImages()" class="left-arrow" src="./img/linker-pfeil-white.png" alt="Forward Button">`;
        document.querySelector('.rightGrid').innerHTML = /*html*/`<img onclick="swipeForwardImages()" class="right-arrow" src="./img/rechter-pfeil-white.png" alt="Backward Button">`;
        document.querySelector('.headerGrid').innerHTML = /*html*/`<img onclick="closeImage()" class="close" src="./img/schaltflache-loschen-white.png" alt="Close Button">`;
        document.querySelector('.close').style.setProperty('margin', '-32px 40px 0 0');
        document.querySelector('.mainGrid').style.setProperty('margin', '-64px 0 0 0');
        document.querySelector('.left-arrow').style.setProperty('margin', '-32px 0 0 0');
        document.querySelector('.mainGrid').style.setProperty('margin', '-24px 0 0 0');
        document.querySelector('.right-arrow').style.setProperty('margin', '-32px 0 0 0');
    }
}


window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    if (!document.querySelector('.mask')) return;
    content.includeHTML().then(res => {
        portrait = e.matches;
        setNavigation(portrait);
        loadSlidePictures(imagesCopy, count)
    }).catch(err => console.log(err));
});

window.prev = prev;
window.next = next;
export default {}
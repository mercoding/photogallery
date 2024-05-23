import * as content from './content.js';
import * as animation from './animation.js';


export let images = ['colorado-5156229_1280.jpg', 'desert-864988_1280.jpg', 'mountains-139012_1280.jpg',
    'mountains-4693731_1280.jpg', 'nature-8063737_1280.jpg', 'new-york-1867569_1280.jpg',
    'road-1303617_1280.jpg', 'road-1536748_1280.jpg', 'road-1958388_1280.jpg',
    'sandstone-4625_1280.jpg', 'sandstones-53621_1280.jpg', 'sandstones-53637_1280.jpg',
    'san-francisco-4271367_1280.jpg', 'santa-cruz-2107464_1280.jpg', 'yosemite-8177850_1280.jpg'];
export let currentImgIndex = 0, openedImage = false, openedImageIndex = 0, portrait = true;


export function loadPictures() {
    content.includeHTML().then(res => {
        for (let i = 0; i < images.length; i++) {
            document.getElementById('imgcontainer').innerHTML += /*html*/`
          <div id="image${i}" onclick="openImage(${i})" class="imgbox">
            <img src="pictures/${images[i]}" alt="Image${i}">
          </div>  
        `;
        }
    }).catch(err => console.log(err));
}


export function openImage(i) {
    openedImage = true;
    currentImgIndex = i;
    openedImageIndex = i;
    animation.start(images, i);
}


export function swipeForwardImages() {
    if(!openedImage) return;
    currentImgIndex++;
    currentImgIndex = (currentImgIndex > images.length - 1) ? 0 : currentImgIndex;
    animation.next(images, currentImgIndex);
}


export function swipeBackwardsImages() {
    if(!openedImage) return;
    currentImgIndex--;
    currentImgIndex = (currentImgIndex < 0) ? images.length - 1 : currentImgIndex;
    animation.prev(images, currentImgIndex);
}


export function closeImage() {
    openedImage = false;
    content.currentContent('pictures');
    enableScroll();
}


function enableScroll() {
    window.onscroll = function () { };
}


window.openImage = openImage;
window.swipeForwardImages = swipeForwardImages;
window.swipeBackwardsImages = swipeBackwardsImages;
window.closeImage = closeImage;
export default {}
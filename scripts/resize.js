import * as buttons from './buttons.js';
import content from './content.js';


export function determineAvailableSpace() {
    let mask = document.querySelector('.mask');
    let w = (window.innerWidth * (0.65 - (window.innerWidth / 10000))) + (window.innerHeight / 8) + 'px';
    if(content.portrait) w = (window.innerWidth * (0.45 - (window.innerWidth / 10000))) + (window.innerHeight / 8) + 'px';
    else (document.querySelector('.mainGrid')) ? document.querySelector('.mainGrid').style.setProperty('margin-top', `-40px`) : 0;
    if (mask != null) document.querySelector('.mask').style.setProperty('--img-full-width', `${w}`);
}


window.addEventListener('resize', function () {
    buttons.setBurgerButtonToFalse();
    determineAvailableSpace();

    if (window.innerWidth > 1000) {
        buttons.openMenu();
        buttons.setMenu(true);
    }

    else {
        buttons.closeMenu();
        buttons.setMenu(false);
    }

    if (window.innerWidth >= 420) {
        buttons.showSidebarImages();
    }
});
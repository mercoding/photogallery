import * as pictures from './pictures.js';

// Experimental script for swipe functionality on mobile devices
/*let swipedir, startX, startY, distX, distY, threshold = 150, restraint = 100, allowedTime = 300, elapsedTime, startTime, handleswipe;


function touchstart(touchsurface) {
    touchsurface.addEventListener('touchstart', function (e) {
        let touchobj = e.changedTouches[0];
        swipedir = 'none';
        distX = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        e.preventDefault();
    }, false);
}


function touchmove(touchsurface) {
    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault(); // prevent scrolling when inside DIV
    }, false);
}


function touchend(touchsurface) {
    handleswipe = callback || function (swipedir) { }
    touchsurface.addEventListener('touchend', function (e) {
        let touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
        e.preventDefault();
    }, false);
}

function swipedetect(el, callback) {
    let touchsurface = el;
   

    touchstart(touchsurface);
    touchmove(touchsurface);
    touchend(touchsurface);
}


//export function listener() {
    window.addEventListener('load', function () {
        let el = document.getElementById('mainGrid');
        document.getElementById('test').innerHTML = el;
        if (el == null) return;
        let hidetimer = null;
        swipedetect(el, function (swipedir) {
            if (swipedir != 'none') {
                document.getElementById('test').innerHTML = swipedir;
                let output = swipedir;
                if (output == 'left') {
                    pictures.swipeForwardImages();
                }
                if (output == 'right') {
                    pictures.swipeBackwardsImages();
                }
                clearTimeout(hidetimer);
            }
        })
    }, false);
//}*/



function swipedetect(el, callback) {
    var touchsurface = el, swipedir, startX, startY, distX, distY, threshold = 150, restraint = 100, allowedTime = 300, elapsedTime, startTime;
    var handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        distX = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault(); // prevent scrolling when inside DIV
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
        e.preventDefault();
    }, false);
}


//export function start() {
    window.addEventListener('load', function () {
        var el = document.getElementById('mask');
        if (el == null) return;
        var hidetimer = null;
        swipedetect(el, function (swipedir) {
            if (swipedir != 'none') {
                document.getElementById('test').innerHTML = swipedir;
                clearTimeout(hidetimer);
                var output = swipedir;

                if (output == 'left') {
                    pictures.swipeForwardImages();
                }
                if (output == 'right') {
                    pictures.swipeBackwardsImages();
                }
            }
        })
    }, false);
//}
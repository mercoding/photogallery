let pos = 0;


function prev() {
    let cubeAnim = document.querySelector('.image-cube');

    pos -= 90;
    cubeAnim.classList.add('cubicSlideAnimation');
    cubeAnim.style.setProperty('--nextRotation', `${pos}deg`);

    Promise.all(cubeAnim.getAnimations().map((animation) => animation.finished)).then(
        () => {
            cubeAnim.style.setProperty('--currentRotation', `${pos}deg`);
            cubeAnim.classList.remove('cubicSlideAnimation');
        }
    );
}


function next() {
    let cubeAnim = document.querySelector('.image-cube');

    pos += 90;
    cubeAnim.classList.add('cubicSlideAnimation');
    cubeAnim.style.setProperty('--nextRotation', `${pos}deg`);

    Promise.all(cubeAnim.getAnimations().map((animation) => animation.finished)).then(
        () => {
            cubeAnim.style.setProperty('--currentRotation', `${pos}deg`);
            cubeAnim.classList.remove('cubicSlideAnimation');
        }
    );
}
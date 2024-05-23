let pos = 0;


export function prev() {
    pos -= 90;
    document.querySelector(".image-cube").style.transform = `rotateY(${pos}deg)`;
}

export function next() {
    pos += 90;
    document.querySelector(".image-cube").style.transform = `rotateY(${pos}deg)`;
}


window.prev = prev;
window.next = next;
export default {}
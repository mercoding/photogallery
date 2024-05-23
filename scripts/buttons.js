export let burgerButtonClicked = false, form = document.getElementById("my-form"), isMenuOpen = false;


export function showSidebarImages() {
    document.getElementById('picturesImgId').style.setProperty('display', 'block');
    document.getElementById('languageImgId').style.setProperty('display', 'block');
    document.getElementById('imprintImgId').style.setProperty('display', 'block');
    document.getElementById('dataprotectionImgId').style.setProperty('display', 'block');
}


export function openMenu() {
    document.getElementById('aside').style.setProperty('display', 'block');
    document.getElementById('aside').style.setProperty('background-color', 'white');
    if (burgerButtonClicked || window.innerWidth > 1000)
        document.getElementById('aside').style.setProperty('box-shadow', '8px 0px 5px -2px rgba(0, 0, 0, 0.3)');
    showSidebarImages();
    document.getElementById('picturesParagraphId').style.setProperty('display', 'block');
    document.getElementById('selectLanguageId').style.setProperty('display', 'block');
    document.getElementById('imprintParagraphId').style.setProperty('display', 'block');
    document.getElementById('dataprotectionParagraphId').style.setProperty('display', 'block');
}


export function closeMenu() {
    isMenuOpen = false;
    burgerButtonClicked = false;
    document.getElementById('aside').style.setProperty('background-color', 'transparent');
    document.getElementById('aside').style.setProperty('box-shadow', 'none');
    document.getElementById('picturesParagraphId').style.setProperty('display', 'none');
    document.getElementById('selectLanguageId').style.setProperty('display', 'none');
    document.getElementById('imprintParagraphId').style.setProperty('display', 'none');
    document.getElementById('dataprotectionParagraphId').style.setProperty('display', 'none');
    if (window.innerWidth < 420) {
        document.getElementById('aside').style.setProperty('display', 'none');
        document.getElementById('picturesImgId').style.setProperty('display', 'none');
        document.getElementById('languageImgId').style.setProperty('display', 'none');
        document.getElementById('imprintImgId').style.setProperty('display', 'none');
        document.getElementById('dataprotectionImgId').style.setProperty('display', 'none');
    }
}


export function isMenuOpenOnSmallScreenSize() {
    if (window.innerWidth > 1000) return;
    if (isMenuOpen) {
        isMenuOpen = !isMenuOpen;
        burgerButtonClicked = !burgerButtonClicked;
        closeMenu();
    }
}


export function burgerButtonWasClicked() {
    if (window.innerWidth > 1000) {
        burgerButtonClicked = false;
        return;
    }

    burgerButtonClicked = !burgerButtonClicked;
    (burgerButtonClicked) ? openMenu() : closeMenu();
    isMenuOpen = !isMenuOpen;
}


export function setMenu(bool) {
    isMenuOpen = bool;
}


export function setBurgerButtonToFalse() {
    burgerButtonClicked = false;
}


export async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}


window.isMenuOpenOnSmallScreenSize = isMenuOpenOnSmallScreenSize;
window.burgerButtonWasClicked = burgerButtonWasClicked;
window.setBurgerButtonToFalse = setBurgerButtonToFalse;
window.form = form;
window.handleSubmit = handleSubmit;
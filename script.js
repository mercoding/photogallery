let images = ['colorado-5156229_1280.jpg', 'desert-864988_1280.jpg', 'mountains-139012_1280.jpg',
    'mountains-4693731_1280.jpg', 'nature-8063737_1280.jpg', 'new-york-1867569_1280.jpg',
    'road-1303617_1280.jpg', 'road-1536748_1280.jpg', 'road-1958388_1280.jpg',
    'sandstone-4625_1280.jpg', 'sandstones-53621_1280.jpg', 'sandstones-53637_1280.jpg',
    'san-francisco-4271367_1280.jpg', 'santa-cruz-2107464_1280.jpg', 'yosemite-8177850_1280.jpg'];


let language = 'german', burgerButtonClicked = false, currentImgIndex = 0, currentType = '', form = document.getElementById("my-form");


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
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


function currentContent(name) {
    if (name == currentType) return;
    currentType = name;
    getLanguage();
    checkLanguage();
    setContent(name);
    includeHTML();
    includeHTML().then(res => {
        if (name == 'pictures') {
            loadPictures();
        }
    }).catch(err => console.log(err));
}


function loadPictures() {
    includeHTML().then(res => {
        for (let i = 0; i < images.length; i++) {
            document.getElementById('imgcontainer').innerHTML += /*html*/`
          <div onclick="openImage(${i})" class="imgbox">
            <img src="pictures/${images[i]}" alt="Image${i}">
          </div>  
        `;
        }
    }).catch(err => console.log(err));
}


function openImage(i) {
    currentImgIndex = i;
    document.getElementById('mask').classList.remove('d-none');
    document.getElementById('currentPicture').setAttribute('src', `pictures/${images[i]}`);
}


function swipeForwardImages() {
    currentImgIndex++;
    currentImgIndex = (currentImgIndex > images.length - 1) ? 0 : currentImgIndex;
    openImage(currentImgIndex);
}


function swipeBackwardsImages() {
    currentImgIndex--;
    currentImgIndex = (currentImgIndex < 0) ? images.length - 1 : currentImgIndex;
    openImage(currentImgIndex);
}


function closeImage() {
    document.getElementById('mask').classList.add('d-none');
}


function checkLanguage() {
    if (language == 'german') {
        setGerman();
    }
    else {
        setEnglish();
    }
}


function getLanguage() {
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'english');
    }
    language = localStorage.getItem('language');
}


function switchLanguage() {
    (language == 'german') ? setEnglish() : setGerman();
    translateCurrentPage();
}


function changeLanguage() {
    let languageId = document.getElementById('selectLanguageId');
    (languageId.value == 1) ? setGerman() : setEnglish();
    translateCurrentPage();
}


function setGerman() {
    language = 'german';
    localStorage.setItem('language', 'german');
    document.getElementById('selectLanguageId').options[0].text = 'Deutsch';
    document.getElementById('headlineId').innerHTML = 'fotos';
    document.getElementById('picturesParagraphId').innerHTML = 'Fotos';
    document.getElementById('languageImgId').setAttribute('src', 'img/deutsche.png');
    document.getElementById('selectLanguageId').options[0].setAttribute('selected', 'selected');
    document.getElementById('selectLanguageId').options[1].removeAttribute('selected', 'selected');
    document.getElementById('imprintId').setAttribute('onclick', `currentContent('impressum')`);
    document.getElementById('imprintParagraphId').innerHTML = 'Impressum';
    document.getElementById('dataprotectionId').setAttribute('onclick', `currentContent('datenschutz')`);
    document.getElementById('dataprotectionParagraphId').innerHTML = 'Datenschutz';
}


function setEnglish() {
    language = 'english';
    document.getElementById('selectLanguageId').options[0].text = 'German';
    localStorage.setItem('language', 'english');
    document.getElementById('headlineId').innerHTML = 'photos';
    document.getElementById('picturesParagraphId').innerHTML = 'Photos';
    document.getElementById('languageImgId').setAttribute('src', 'img/vereinigtes-konigreich.png');
    document.getElementById('selectLanguageId').options[1].setAttribute('selected', 'selected');
    document.getElementById('selectLanguageId').options[0].removeAttribute('selected', 'selected');
    document.getElementById('imprintId').setAttribute('onclick', `currentContent('imprint')`);
    document.getElementById('imprintParagraphId').innerHTML = 'Imprint';
    document.getElementById('dataprotectionId').setAttribute('onclick', `currentContent('dataprotection')`);
    document.getElementById('dataprotectionParagraphId').innerHTML = 'Data Protection';
}


function translateCurrentPage() {
    switch (language) {
        case "german":
            if (currentType == "imprint")
                currentContent('impressum')
            else if (currentType == "dataprotection")
                currentContent('datenschutz')
            break;

        case "english":
            if (currentType == "impressum")
                currentContent('imprint')
            else if (currentType == "datenschutz")
                currentContent('dataprotection')
            break;

        default:
            break;
    }
}


function showSidebarImages() {
    document.getElementById('picturesImgId').style.setProperty('display', 'block');
    document.getElementById('languageImgId').style.setProperty('display', 'block');
    document.getElementById('imprintImgId').style.setProperty('display', 'block');
    document.getElementById('dataprotectionImgId').style.setProperty('display', 'block');
}


function openMenu() {
    document.getElementById('aside').style.setProperty('background-color', 'white');
    if (burgerButtonClicked || window.innerWidth > 1000)
        document.getElementById('aside').style.setProperty('box-shadow', '8px 0px 5px -2px rgba(0, 0, 0, 0.3)');
    showSidebarImages();
    document.getElementById('picturesParagraphId').style.setProperty('display', 'block');
    document.getElementById('selectLanguageId').style.setProperty('display', 'block');
    document.getElementById('imprintParagraphId').style.setProperty('display', 'block');
    document.getElementById('dataprotectionParagraphId').style.setProperty('display', 'block');
}


function closeMenu() {
    document.getElementById('aside').style.setProperty('background-color', 'transparent');
    document.getElementById('aside').style.setProperty('box-shadow', 'none');
    document.getElementById('picturesParagraphId').style.setProperty('display', 'none');
    document.getElementById('selectLanguageId').style.setProperty('display', 'none');
    document.getElementById('imprintParagraphId').style.setProperty('display', 'none');
    document.getElementById('dataprotectionParagraphId').style.setProperty('display', 'none');
    if (window.innerWidth <= 730) {
        document.getElementById('picturesImgId').style.setProperty('display', 'none');
        document.getElementById('languageImgId').style.setProperty('display', 'none');
        document.getElementById('imprintImgId').style.setProperty('display', 'none');
        document.getElementById('dataprotectionImgId').style.setProperty('display', 'none');
    }
}


function burgerButtonWasClicked() {
    if (window.innerWidth > 1000) {
        burgerButtonClicked = false;
        return;
    }

    burgerButtonClicked = !burgerButtonClicked;
    (burgerButtonClicked) ? openMenu() : closeMenu();
}


window.addEventListener('resize', function () {
    burgerButtonClicked = false;
    if (window.innerWidth > 1000) {
        openMenu();
    }

    else {
        closeMenu();
    }

    if (window.innerWidth >= 420) {
        showSidebarImages();
    }
});


async function handleSubmit(event) {
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
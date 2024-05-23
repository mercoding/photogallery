import { currentContent, currentType } from './content.js';


let language = 'german';


export function checkLanguage() {
    if (language == 'german') {
        setGerman();
    }
    else {
        setEnglish();
    }
}


export function getLanguage() {
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

window.switchLanguage = switchLanguage;
window.changeLanguage = changeLanguage;

//persit the site color
let mainColor = localStorage.getItem("site_color");
const colorsOptions = document.querySelectorAll('.setting-options .colors-list li');
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor) 
    // = rout.style.setPro...
    colorsOptions.forEach(color => {
        if (color.dataset.color === mainColor) {
            color.classList.add('active');
        }else {
            color.classList.remove('active')
        }
    })
}
//handel clicking on setting-toggle
let settingBox = document.querySelector('.setting-box');
document.querySelector('.toggle-container i').addEventListener('click', () => {
    settingBox.classList.toggle('opened');
    document.querySelector('.toggle-container i').classList.toggle('fa-spin');
})
document.addEventListener('click', (e) => {
    if ( !e.target.closest('.setting-box') && settingBox.classList.contains('opened')) {
        settingBox.classList.remove('opened');
    }
})
//Switch site colors
const root = document.querySelector(':root');
colorsOptions.forEach(color => {
    color.addEventListener('click', (e) => {
        handleActiveClass(colorsOptions, e)
        root.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem("site_color", e.target.dataset.color);
    })
});
let backgroundInterval;
let landingDOM = document.querySelector('.landing');
let tab = ['bg1','bg2','bg3','bg4','bg5'];
let randomBackground = localStorage.getItem("random_background");
//Handle change bacground option in the settings box
spanElements = document.querySelectorAll('.random-backgrounds span');
spanElements.forEach(span => {
    span.addEventListener('click', (e) => {  
        handleActiveClass(spanElements, e);
        localStorage.setItem("random_background", e.target.dataset.background);
        if (e.target.dataset.background === 'yes') {
            changeBackground();
        } else  {
            clearInterval(backgroundInterval);
        }
    })
})
//function change backround
const changeBackground = () => {
    backgroundInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * tab.length);
        landingDOM.style.backgroundImage = `url('../images/bg${randomNumber}.jpg')`;
    }, 8000);
}
// Set background setting from local storage 
let backStorage = localStorage.getItem("random_background");
const backgroundFromStorege = () => { 
    spanElements.forEach(span => {
        span.classList.remove('active');
    });
    if (backStorage === 'yes') {
        document.querySelector('.random-backgrounds .yes').classList.add('active');
        changeBackground()
    }else {
        document.querySelector('.random-backgrounds .no').classList.add('active');
        clearInterval(backgroundInterval);
    }
}
if (backStorage != null) {
    backgroundFromStorege();
}
//Handle bar menu for medium screens
barMenu = document.querySelector('.nav-menu .bar-menu');
barMenu.addEventListener('click', () => {
    document.querySelector('.landing .nav-menu .links').classList.toggle('active-bar');
})
document.addEventListener('click', (e) =>{
    if (!e.target.closest('.nav-menu')) {
        document.querySelector('.landing .nav-menu .links').classList.remove('active-bar');        
    }
})
// Animate skills progress in Skills section
skillProgSpans = document.querySelectorAll('.skill-box .skill-progress span')
window.addEventListener('scroll', () => {
    if (window.scrollY > document.querySelector('.skills').offsetTop - 50 ) {
        skillProgSpans.forEach(span => {
            span.style.width = span.dataset.progress ;
            span.closest('.skills .skill-box').setAttribute('data-after', span.dataset.progress);
        })
    }
})
//Create popup with the image
let myGalleryImages = document.querySelectorAll('.gallery .images-box img');
const createGallery = () => {
    myGalleryImages.forEach(img => {
        img.addEventListener('click', () => {
            let alt;
            popupContainer = document.createElement('div');
            popupContainer.classList.add('popup-container');
            document.body.append(popupContainer);
            if (img.alt) {
                alt = img.alt ;
            } else {
                alt = 'My Image'
            }
            document.querySelector('.popup-container').innerHTML= `
            <div class="gallery-overlay">
                <div class="popup">
                    <i class="fa-solid fa-xmark close"></i>
                    <h3 class="heading">${alt}<h3>
                    <img src="${img.getAttribute('src')}" alt="${alt}">
                </div>
            </div>
            ` ; 
        })
    })
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-overlay') || e.target.classList.contains('close')) {
            document.querySelector('.popup-container').remove();
        }
    })
}
createGallery();
// Handle Bullets
scrollToSection('.nav-bullets .bullet');
function scrollToSection (selector) {
    const allClickedElements = document.querySelectorAll(selector);
    allClickedElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            let section = e.target.dataset.section;
            document.querySelector(`.${section}`).scrollIntoView({
                behavior: 'smooth'
            })
        })
    });
}
//Menu Smooth Scrooling
scrollToSection('nav .nav-menu .links a');
//Handle Active State
function handleActiveClass(listElements, e) {
    listElements.forEach(element => {
        element.classList.remove('active');
    });
    e.target.classList.add('active');
}
// Handle Bullets displaying
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => { console.log(span);
        handleActiveClass(bulletsSpan, e);
        localStorage.setItem("bullets-option", span.dataset.bullets);
        if (span.dataset.bullets === 'yes') {
            bulletsContainer.style.display = 'block' ;
        }else {
            bulletsContainer.style.display = 'none' ;
        }
    })
})
// Set Bullets setting from local storage 
let bulletsStorage = localStorage.getItem("bullets-option");
const displayBulletsFromStorage = () => { 
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletsStorage === 'yes') {
        document.querySelector('.bullets-option .yes').classList.add('active');
        bulletsContainer.style.display = 'block' ;
    }else {
        document.querySelector('.bullets-option .no').classList.add('active');
        bulletsContainer.style.display = 'none' ;
    }
}
if (bulletsStorage != null) {
    displayBulletsFromStorage();
}
// Reset Button
document.querySelector(".reset-options").onclick = function () {
    //localStorage.clear();
    localStorage.removeItem("site_color");
    localStorage.removeItem("random_background");
    localStorage.removeItem("bullets-option");
    window.location.reload();
}    







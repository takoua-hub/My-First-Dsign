
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
        colorsOptions.forEach(color => {
            color.classList.remove('active');
        })
        e.target.classList.add('active');
        root.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem("site_color", e.target.dataset.color);
    })
});


let backgroundInterval;
let landingDOM = document.querySelector('.landing');
let tab = ['bg1','bg2','bg3','bg4','bg5'];
let randomBackground = localStorage.getItem("random_background");

//Handle change bacground in the settings box
spanElements = document.querySelectorAll('.option-box span');
spanElements.forEach(span => {
    span.addEventListener('click', (e) => {  
        spanElements.forEach(span => {
            span.classList.remove('active');
        });
        e.target.classList.add('active');
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
       
        document.querySelector('.option-box .yes').classList.add('active');
        changeBackground()
    }else {
        document.querySelector('.option-box .no').classList.add('active');
        clearInterval(backgroundInterval);
    }
}
backgroundFromStorege();

//Handle bar menu function for medium screens
barMenu = document.querySelector('.nav-menu .bar-menu');
barMenu.addEventListener('click', () => {
    document.querySelector('.landing .nav-menu .links').classList.toggle('active-bar');
})

document.addEventListener('click', (e) =>{
    if (!e.target.closest('.nav-menu')) {
        document.querySelector('.landing .nav-menu .links').classList.remove('active-bar');        
        console.log('ok');
    }
})


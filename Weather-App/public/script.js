const api = {
    key: "4f72044bc47a9aee9c04c42f9739eb92",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then (displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

let now = new Date;
let date = document.querySelector('.location .date');
date.innerText = dateBuilder(now);

let temp = document.querySelector('.current .temp');
temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

let weather_el = document.querySelector('.current .weather');
weather_el.innerText = weather.weather[0].main;

let hilow = document.querySelector('.current .hi-low');
hilow.innerText = `${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return  `${day} ${date} ${month} ${year}`;
}
if (`serviceWorker` in navigator){
    try {
        navigator.serviceWorker.register('sw.js');
        //console.log('sw reistered');
    } catch (error) {
        console.log('sw failed');
        
    }
}
//LOCAL STORAGE

searchbox.addEventListener('keyup', save);

function save(event){
    const imp = searchbox.value;
    
    if (event.keyCode === 13){
        window.localStorage.setItem('text', imp);
          
    }
}


function load(){

    var storedValue = localStorage.getItem('text');  
    if(storedValue){
    searchbox.value = storedValue;
    }  
    
}

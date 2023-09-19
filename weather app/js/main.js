// function to retrieve f1 data
// const getData = async (season, round) => {
//     let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
//     console.log(response)
//     console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
//     return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
// }
// create constant to hold DOM Elements
// const rangerList = '.ranger-list'


// Creation of the F1 List HTML
// const createList = (position, givenName, familyName, nationality, name, points) => {
//     const html = `<div id=${position} class="card mt-3 mb-3" style="width: 18rem;">
//     <ul class="list-group list-group-flush" id=${givenName}>
//     <li class="list-group-item">Position: ${position}</li>
//     <li class="list-group-item"> Name: ${givenName}, ${familyName}</li>
//     <li class="list-group-item">Nationality: ${nationality}</li>
//     <li class="list-group-item">Sponser: ${name}</li>
//     <li class="list-group-item">Points: ${points}</li>

//   </ul>
// </div>`
//     document.querySelector(rangerList).insertAdjacentHTML('beforeend', html)
// }
// const loadData = async () => {
//     let season = document.querySelector("#season").value //coming from form that is build based of the id on that form
//     let round = document.querySelector("#round").value
//     console.log(season, round)
//     const rangers = await getData(season, round)
//     rangers.forEach(element => createList(element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name, element.points))
// }
// const clearData = () => {
//     document.querySelector(rangerList).innerHTML = '';
// }

const apiKey = "449b3a98995d1f2086753a6d1ffeb1e2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button ")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }


}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

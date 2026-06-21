const button = document.getElementById("search-btn");
button.addEventListener("click", getWeather);

async function getWeather(){
    const cityValue = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    const resultBox = document.getElementById("resultBox");
    resultBox.innerHTML =
    `<div>
    <p>${cityValue} --- ${temperature}</p>
    <p>Feels Like : ${feelsLike}</p>
    <p>Humidity : ${humidity}</p>
    <p>${description}</p>
    </div>`;
    resultBox.classList.add("active");
}

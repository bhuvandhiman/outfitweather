const button = document.getElementById("search-btn");
button.addEventListener("click", getWeather);

async function getWeather(){
    const resultBox = document.getElementById("resultBox");
    const cityValue = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if(!response.ok){
        resultBox.innerHTML = `<div><p>City Not Found, Please try Again</p></div>`;
        resultBox.classList.add("active");
        return;
    }
    const data = await response.json();
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    resultBox.innerHTML =
    `<div>
    <p>${cityValue} --- ${Math.round(temperature)} °C</p>
    <p>Feels Like : ${Math.round(feelsLike)} °C</p>
    <p>Humidity : ${humidity}</p>
    <p>${description}</p>
    </div>`;
    resultBox.classList.add("active");
}

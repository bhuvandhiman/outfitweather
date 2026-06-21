const button = document.getElementById("search-btn");
button.addEventListener("click", getWeather);

async function getWeather(){
    const cityValue = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

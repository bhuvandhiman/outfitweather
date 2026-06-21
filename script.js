const button = document.getElementById("search-btn");
button.addEventListener("click", getWeather);

async function getWeather(){
    const resultBox = document.getElementById("resultBox");
    button.disabled = true;

    resultBox.innerHTML = `<div><p>Fetching Weather and Outfit Suggestion...</p></div>`;
    resultBox.classList.add("active");

    const cityValue = document.getElementById("city-input").value;

    const response = await fetch("http://localhost:3000/api/outfit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({city : cityValue})
    })
    if(!response.ok){
        resultBox.innerHTML = `<div><p>City Not Found, Please try Again</p></div>`;
        resultBox.classList.add("active");
        button.disabled = false;
        return;
    }
    const result = await response.json();
    
    resultBox.innerHTML =
    `<div>
    <p>${cityValue} --- ${Math.round(result.temperature)} °C</p>
    <p>Feels Like : ${Math.round(result.feelsLike)} °C</p>
    <p>Humidity : ${result.humidity}</p>
    <p>${result.description}</p>
    <p>${result.outfitSuggestion}</p>
    </div>`;
    resultBox.classList.add("active");
    button.disabled = false;
}

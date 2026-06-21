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

    const prompt = `The current temperature is ${temperature}°C, but it feels like ${feelsLike}°C. The humidity is ${humidity}%, and the weather is described as ${description}. Based on these conditions, what outfit would you recommend for today?, Keep your response to 2-3 short sentences, no markdown formatting, no numbered lists — just plain conversational advice."`
    const groqUrl = `https://api.groq.com/openai/v1/chat/completions`;

    const groqResponse = await fetch(groqUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {role : "user", content : prompt}
            ]
        })
    });
    const groqData = await groqResponse.json();
    const outfitSuggestion = groqData.choices[0].message.content;
    resultBox.innerHTML =
    `<div>
    <p>${cityValue} --- ${Math.round(temperature)} °C</p>
    <p>Feels Like : ${Math.round(feelsLike)} °C</p>
    <p>Humidity : ${humidity}</p>
    <p>${description}</p>
    <p>${outfitSuggestion}</p>
    </div>`;
    resultBox.classList.add("active");
}

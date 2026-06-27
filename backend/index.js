const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/outfit", async (req, res) => {
    const cityValue = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    if(!response.ok){
        res.status(404).json({error: "City not found"});
        return;
    }
    const data = await response.json();
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const timezone = data.timezone;

    const prompt = `The current temperature is ${temperature}°C, but it feels like ${feelsLike}°C. The humidity is ${humidity}%, and the weather is described as ${description}. Based on these conditions, what outfit would you recommend for today?, Keep your response to 2-3 short sentences, no markdown formatting, no numbered lists — just plain conversational advice."`
    const groqUrl = `https://api.groq.com/openai/v1/chat/completions`;
    const groqResponse = await fetch(groqUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
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

    res.json({temperature, feelsLike, humidity, description, outfitSuggestion, timezone});
});
app.post("/api/reverse-geocode", async (req, res) => {
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({ city: data[0].name })
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
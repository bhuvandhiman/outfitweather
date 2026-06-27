import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  async function getOutfit() {
    setLoading(true);
    setError("");
    const response = await fetch("http://localhost:3000/api/outfit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({city})
    })
    if(!response.ok){
        setError("City Not Found, Please try Again");
        setLoading(false);
        return;
    }
    const data = await response.json();
    setResult(data);
    setLoading(false);
  }
  
  useEffect(() => {                      
    navigator.geolocation.getCurrentPosition(async (position) => {   
      const latitude = position.coords.latitude;
      const longitude  = position.coords.longitude;
      const response = await fetch("http://localhost:3000/api/reverse-geocode", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({latitude, longitude})
      })
      const data = await response.json();
      setCity(data.city);
    });                                        
  }, []);
      
  function getBackground(){
    const hour = new Date().getHours();
    if(hour > 5 && hour <= 8){
      return "linear-gradient(to bottom, #FF9A8B, #FFD56F)";
    }else if(hour > 8 && hour <= 17){
      return "linear-gradient(to bottom, #4FACFE, #C2E9FB)";
    }else if(hour > 17 && hour <= 19){
      return "linear-gradient(to bottom, #FF7E5F, #FEB47B)";
    }else if (hour > 19 || hour <= 5) {
      return "linear-gradient(to bottom, #0F2027, #203A43, #2C5364)";
    }
  }
  return (
    <>
      <div className="container" style={{background: getBackground(), minHeight: "100vh"}}>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City'></input>
        <button onClick={() => getOutfit()}>Get suggestions</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {result && 
          <div>
            <p>{city} --- {Math.round(result.temperature)} °C</p>
            <p>Feels Like : {Math.round(result.feelsLike)} °C</p>
            <p>Humidity : {result.humidity}</p>
            <p>{result.description}</p>
            <p>{result.outfitSuggestion}</p>
          </div>
        }
      </div>
    </>
  )
}
export default App

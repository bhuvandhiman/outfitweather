import { useState } from 'react'
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
  return (
    <>
      <div>
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

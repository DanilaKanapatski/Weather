import React, {useState} from 'react';
import './App.css';
import {Weather} from "./Weather";

function App() {


    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<null | string>(null);
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);



    const fetchWeather = () => {
        // const city = 'minsk'
        const api = "85693da3892b2781b9f0cb28fce5bcf2"

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                } else {
                    setWeather({
                        temp:json.main.temp,
                        description: json.weather[0].description,
                    });
                    setError(null);
                }
            })
            .catch(error => {
            console.error('Ошибка:', error);
            setError('An error occurred');
        });
    }
    return (
        <div className="App">
            <h1>Weather App</h1>
            <div><input type="text" onChange={(e) => setCity(e.currentTarget.value)}/>
                <button onClick={fetchWeather}>Get weather</button>
            </div>
            {weather && <Weather temp={weather.temp} description={weather.description} />}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}
        </div>
    );
}

export default App;

// .then(json => {                if (json.cod === "404") {                    setError('City not found'); // Устанавливаем ошибку, если город не найден                } else {                    console.log(json);                    setError(null); // Сбрасываем ошибку, если запрос успешен                }            })            .catch(error => {                console.error('Ошибка:', error);                setError('An error occurred'); // Общая ошибка на случай других проблем            });
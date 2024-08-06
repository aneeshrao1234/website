document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        document.getElementById('error').style.display = 'none';
        document.getElementById('weather-info').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        getWeather(city);
    } else {
        document.getElementById('error').innerText = 'Please enter a city name.';
        document.getElementById('error').style.display = 'block';
    }
});

async function getWeather(city) {
    const apiKey = 'ece3a891ed8752b5ddaaf5066833a4d9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('loading').style.display = 'none';
        if (data.cod === 200) {
            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `${data.main.temp} °C`;
            document.getElementById('weather').innerText = data.weather[0].description;
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('weather-icon').src = iconUrl;
            document.getElementById('weather-info').style.display = 'block';
        } else {
            document.getElementById('error').innerText = 'City not found. Please check the city name and try again.';
            document.getElementById('error').style.display = 'block';
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').innerText = 'Failed to fetch weather data. Please try again later.';
        document.getElementById('error').style.display = 'block';
    }
}

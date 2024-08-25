document.addEventListener('DOMContentLoaded', function () {
    const weatherContainer = document.querySelector('.weather-container');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weather-icon');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiKey = "6841e5450643e5d4ff59981dbf58944e";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const weatherIcon = `wi wi-owm-${data.weather[0].id}`;
                const temperature = `${data.main.temp}°C`;
                const humidity = `${data.main.humidity}%`;
                const windSpeed = `${data.wind.speed} km/h`;

                const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                locationElement.textContent = data.name;
                weatherIconElement.className = weatherIcon;
                temperatureElement.textContent = temperature;
                humidityElement.textContent = humidity;
                windSpeedElement.textContent = windSpeed;
                sunriseElement.textContent = sunriseTime;
                sunsetElement.textContent = sunsetTime;
            } catch (error) {
                weatherContainer.innerHTML = `<p>Failed to fetch weather data.</p>`;
            }
        }, () => {
            weatherContainer.innerHTML = `<p>Location access denied. Cannot fetch weather data.</p>`;
        });
    } else {
        weatherContainer.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
});

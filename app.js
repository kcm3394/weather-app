const apiKey = config.API_KEY;
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const celsiusQuery = '&units=metric';
const fahrenheitQuery = '&units=imperial'

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDesc = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let location = document.querySelector('.city-name');
    let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `${baseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}${fahrenheitQuery}`;

            axios.get(api).then(res => {
                const temp = Math.round(res.data.main.temp);
                const description = capitalizeFirstLetter(res.data.weather[0].description);
                const city = res.data.name;
                const icon = res.data.weather[0].icon;

                //Set DOM elements from API
                temperatureDegree.textContent = temp;
                temperatureDesc.textContent = description;
                location.textContent = city;

                //Convert to Celsius
                let celsius = (temp - 32) * (5 / 9);

                //Set icon
                setIcon(icon);

                //Change temperature to Celsius/Farenheit
                degreeSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.round(celsius);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temp;
                    }
                })
            })
            
        });
    } else {
        h1.textContent = "Please enable geolocation"
    }

    function setIcon(icon) {
        const img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        document.querySelector('.icon').appendChild(img);
    }
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
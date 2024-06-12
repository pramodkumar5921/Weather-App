const apikey="b03b19f387104efccf2493526df649c2";

const WeatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");

const formE1 = document.querySelector("form");

formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityvalue = cityInputE1.value;
    getWeatherData(cityvalue)
})

 async function getWeatherData(cityValue){
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
          );

        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details=[
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        WeatherDataE1.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"
         alt="Weather Icon">`;

         WeatherDataE1.querySelector(
            ".temperature"
         ).textContent = `${temperature}°C`;

         WeatherDataE1.querySelector(".description").textContent = description;

         WeatherDataE1.querySelector(".details").innerHTML = details.map((detail)=>` <div>${detail}</div>`).join("");
    } 
    catch (error) {
        WeatherDataE1.querySelector(
            ".icon"
        ).innerHTML = "";

         WeatherDataE1.querySelector(
            ".temperature"
         ).textContent = "";

         WeatherDataE1.querySelector(".description").textContent = "An Error happened, please try again later";

         WeatherDataE1.querySelector(".details").innerHTML = "";
    }
}
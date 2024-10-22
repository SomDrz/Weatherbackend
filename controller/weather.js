const Weather = require('../Model/DailySummary');
const axios = require('axios');


let API_KEY = '1ca96285465b9a30889222f0cf573aca';
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const fetchWeatherData = async () => {
    try {
        for (const city of cities) {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = response.data;
            const temp = data.main.temp;
            const maxTemp = data.main.temp_max;
            const minTemp = data.main.temp_min;
            const wind = data.wind.speed;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const clouds = data.clouds.all;
            
            const condition = data.weather[0].main;

            // Store or update 
            await Weather.updateOne(
                { city, date: new Date().toDateString() },
                { averageTemperature: temp, maxTemperature: maxTemp, minTemperature: minTemp, dominantCondition: condition,
                wind:wind,pressure:pressure,humidity:humidity,cloud:clouds
                },
                { upsert: true }
            );
        }
    } catch (error) {
        console.error('Error fetching weather data', error);
    }
};

  
setInterval(() => { 
  console.log('calling api'); 
fetchWeatherData()
  
}, 120000); 

// api to get weather summaries
const WeaherSummar = async (req, res)=>{
    try {
        const summaries = await Weather.find();
        res.status(200).json(summaries);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving weather summaries' });
    }
}

const youCityDetail = async(req,res)=>{
    try {
        
        const yourCity = req.query.city; 
        console.log(yourCity);

        if (!yourCity) {
            return res.status(400).json({ message: 'City name is required' });
        }

        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=${API_KEY}&units=metric`);
        console.log(response)
        const weatherData = {
            temperature: response.data.main.temp,
            pressure :response.data.main.pressure,
            humidity : response.data.main.humidity,
            clouds : response.data.clouds.all,
            condition: response.data.weather[0].description,
            city:response.data.name
            
        };

        res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error retrieving weather summaries:', error);
        res.status(500).json({ message: 'Error retrieving weather summaries' });
    }
}

module.exports={WeaherSummar,youCityDetail}
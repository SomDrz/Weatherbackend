// models/Weather.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now },
    averageTemperature: Number,
    maxTemperature: Number,
    minTemperature: Number,
    dominantCondition: String,
    wind:Number,
    cloud:Number,
    weather:String,
    pressure:Number,
    humidity:Number,


});

module.exports = mongoose.model('Weather', WeatherSchema);

const router = require("express").Router();
const {WeaherSummar,youCityDetail} = require("../controller/weather")

router.get("/weather-summary",WeaherSummar)

router.get("/your-city-detail",youCityDetail)

module.exports = router;
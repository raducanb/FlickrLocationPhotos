var http = require('http');

module.exports.getWeather =
function(locationName, callback) {
  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=' + locationName + '&units=metric&APPID=' + process.env.OPEN_WEATHER_KEY
  }

  http.get(options, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);

      var degreesCelsius = parsed.main.temp;

      callback(degreesCelsius);
    });
  });
}

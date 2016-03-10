var locationName = 'Munchen';

var coordinatesService = require('./coordinatesService.js');
var weatherService = require('./weatherService.js');
var flickrService = require('./flickrService.js');

var locationData = {};

coordinatesService.getCoordinates(locationName, function(coordinates){
  console.log(coordinates);

  var lat = coordinates[0];
  var lon = coordinates[1];

  var locationCoordinates = {};
  locationCoordinates.lat = lat;
  locationCoordinates.lon = lon;

  locationData.locationCoordinates = locationCoordinates;

  if (!locationData.weather) { return; }

  getPhotos(locationData);
});

weatherService.getWeather(locationName, function(degreesCelsius) {
  locationData.locationWeather = degreesCelsius;
  
  if (!locationData.locationCoordinates) { return; }

  getPhotos(locationData);
});

var getPhotos = function(locationData) {
  flickrService.getPhotos(
    locationData.locationCoordinates,
    locationData.locationWeather,
    function(photosURLsArray){
      console.log(photosURLsArray);
    });
  };

var locationName = 'Munchen';

var coordinatesService = require('./coordinatesService.js');
var flickrService = require('./flickrService.js');

var locationData = {};

coordinatesService.getCoordinates(locationName, function(coordinates){
  console.log(coordinates);

  var lat = coordinates[0];
  var lon = coordinates[1];

  var locationCoordinates = {};
  locationCoordinates.lat = lat;
  locationCoordinates.lon = lon;

  locationData.coordinates = locationCoordinates;

  if (!locationData.weather) { return; }

  getPhotos(locationData);
});



var getPhotos = function(locationData) {
  flickrService.getPhotos(
    locationData.coordinates,
    locationData.weather,
    function(photosURLsArray){
      console.log(photosURLsArray);
    });
  };

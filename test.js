// Instantiate a map and platform object:
var platform = new H.service.Platform({
    'apikey': 'bji9VJpaLIdb45k-Dba7_cYqHFn3HN7h4HeWDI9iDGw'
  });
  
  // Create the parameters for the reverse geocoding request:
  var reverseGeocodingParameters = {
        prox: '17.421411199999998,78.3745368,150',
        mode: 'retrieveAddresses',
        maxresults: 1
      };
  
  // Define a callback function to process the response:
  function onSuccess(result) {
    var location = result.Response.View[0].Result[0];
    console.log(location);
  };
  
  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();
  
  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  geocoder.reverseGeocode(
      reverseGeocodingParameters,
      onSuccess,
      function(e) { console.log(e); });
# geoLocationService-Angular
An Angular JS geoLocationService

## Use
### Website
When using in a website, make sure to comment out the GPS Enabled portion of the service, as the browser will not have that plugin installed. The browser will only ever check to see if a user has allowed the website to access user's location.

### Mobile with Ionic/Cordova
Make sure that the Diagnostic Plugin is included in your project. Testing can only be done on a mobile device, as the Browser will ignore everything else.

```javascript
// Using the geolocation in your controller 
geoLocationService.getLocation()
  .then(
    function(position) {
      if(position == "GPS_UNAVAILABLE") {
          if(confirm("Location is disabled or custom Error Message.")) {
             cordova.plugins.diagnostic.switchToLocationSettings();
          }
        }
      // *** Your Code *** ///
     }
  );
// To only display once and never again. LocalStorage makes it available across the app.
var alertConfirmed = window.localStorage.getItem("gps_alert")? window.localStorage.getItem("gps_alert") : null;
if(position == "GPS_UNAVAILABLE" && !alertConfirmed) {
   if(confirm("Location is disabled. {Custom Error Message}.")) {
   	window.localStorage.setItem("gps_alert",true);
   	cordova.plugins.diagnostic.switchToLocationSettings();
	} else {
	   	window.localStorage.setItem("gps_alert",true);
	}
}
```

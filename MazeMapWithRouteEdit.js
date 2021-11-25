fetch("routeData.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));

AFRAME.registerComponent('peakfinder', {
	init: function() {
		this.loaded = false;
		//alert(this.loaded);
		window.addEventListener('gps-camera-update-position', e => {
			if(this.loaded === false) {
				//alert("Running");
				this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
				this.loaded = true;
			}
		});
	},
	_loadPeaks: function(longitude, latitude) {
		//alert("Load Peaks");
	const scale = 5;
	fetch("routeData.json")
	.then(response => {
		return response.json();
	})
	.then ( json => {
		json.features.forEach(feature => {
			let entity = document.createElement('a-cone');
			if (feature.geometry.type === "Point") {
			  console.log("Point")
 
			   entity.setAttribute('scale', {
				  x: scale,
				  y: scale,
				  z: scale
			  });
			  entity.setAttribute('gps-projected-entity-place', {
				  latitude: feature.geometry.coordinates[1],
				  longitude: feature.geometry.coordinates[0]
			  });
 
			  //child = this._editRotation(entity, previousEntity)
			  this.el.appendChild(entity);
			  previousEntity = entity
			} else {
			  console.log("Not Point")
			  let x = 0
			  feature.geometry.coordinates.forEach(coordinates => {
				entity.setAttribute('scale', {
					x: scale,
					y: scale,
					z: scale
				});
				entity.setAttribute('gps-projected-entity-place', {
					latitude: feature.geometry.coordinates[x][1],
					longitude: feature.geometry.coordinates[x][0]
				});
 
				//child = this._editRotation(entity, previousEntity)
				this.el.appendChild(entity);
				previousEntity = entity
				x = x + 1
			   entity = document.createElement('a-cone');
			  }) 
			}
			//cone = entity;
		  })
		/*const points = [];
		
		// Get each element and put it into a list
		json.features.forEach(feature => {
			if (feature.geometry.type === "Point") {
				console.log("Adding to list")
				points.push(feature.geometry.coordinates);
			}
			else {
				feature.geometry.coordinates.forEach(coordinates => {
					console.log("Adding to list")
					points.push(coordinates);
				});
			}
		});

		// Create the cones
		points.forEach(coordinates => {
			console.log("Creating cone: " + coordinates);
			let entity = document.createElement('a-cone');
			entity.setAttribute('scale', {
				x: scale,
				y: scale,
				z: scale
			});
			entity.setAttribute('gps-projected-entity-place', {
				latitude: coordinates[1],
				longitude: coordinates[0]
			});
			this.el.appendChild(entity);
		});

		var cones = document.getElementsByTagName("a-cone");
		cones = Array.prototype.slice.call(cones);
		console.log(cones);

		let lastCone = null;

		// Set the rotation of the cones
		cones.forEach(cone => {
			console.log("Setting rotation")
			if (lastCone !== null) {
				let lastConePosition = lastCone.getAttribute('gps-projected-entity-place');
				let currentConePosition = cone.getAttribute('gps-projected-entity-place');
				console.log(lastCone + " pos: " + lastConePosition);
				console.log(cone + " pos: " + currentConePosition);
				const lngDelta = lastConePosition.longitude - currentConePosition.longitude; 
				const latDelta = lastConePosition.latitude - currentConePosition.latitude;
				let angle = Math.atan2(zDelta, latDelta) * 180 / Math.PI;
				console.log(lngDelta);
				console.log(latDelta);
				console.log(angle);
				cone.setAttribute("rotation", "0 " + -angle + " 90");
				console.log(cone);
			}
			lastCone = cone;      
		});*/

		/*
         json.features.forEach(feature => {
           let entity = document.createElement('a-cone');
           if (feature.geometry.type === "Point") {
             console.log("Point")

              entity.setAttribute('scale', {
                 x: scale,
                 y: scale,
                 z: scale
             });
             entity.setAttribute('gps-projected-entity-place', {
                 latitude: feature.geometry.coordinates[1],
                 longitude: feature.geometry.coordinates[0]
             });

             child = this._editRotation(entity, previousEntity)
             this.el.appendChild(child);
             previousEntity = entity
           } else {
             console.log("Not Point")
             let x = 0
             feature.geometry.coordinates.forEach(coordinates => {
               entity.setAttribute('scale', {
                   x: scale,
                   y: scale,
                   z: scale
               });
               entity.setAttribute('gps-projected-entity-place', {
                   latitude: feature.geometry.coordinates[x][1],
                   longitude: feature.geometry.coordinates[x][0]
               });

               child = this._editRotation(entity, previousEntity)
               this.el.appendChild(child);
               previousEntity = entity
               x = x + 1
              entity = document.createElement('a-cone');
             }) 
           }
           //cone = entity;
         }) */
       });
   },
   _editRotation: function(entity, previousEntity) {
     if (previousEntity != null) {
       let cone = previousEntity

       let conePosition = cone.getAttribute('gps-projected-entity-place');
       let entityPosition = entity.getAttribute('gps-projected-entity-place');
       let lngDelta = conePosition.longitude - entityPosition.longitude;
       let latDelta = conePosition.latitude - entityPosition.latitude;
       let angle = Math.atan2(latDelta, lngDelta) * 180 / Math.PI;

       cone.object3D.rotation.set(
          THREE.Math.degToRad(0),
          THREE.Math.degToRad(-angle),
          THREE.Math.degToRad(90)
        );
        return cone;
      }
      else {
        return entity;
      }
   }
    /*_loadPeaks: function(longitude, latitude) {
       const scale = 2000;
       fetch(`https://www.hikar.org/fm/ws/bsvr.php?bbox=${longitude-0.1},${latitude-0.1},${longitude+0.1},${latitude+0.1}&outProj=4326&format=json&poi=natural`
           )
       .then ( response => response.json() )
       .then ( json => {
           json.features.filter ( f => f.properties.natural == 'peak' )
               .forEach ( peak => {
                   const entity = document.createElement('a-text');
                   entity.setAttribute('look-at', '[gps-projected-camera]');
                   entity.setAttribute('value', peak.properties.name);
                   entity.setAttribute('scale', {
                       x: scale,
                       y: scale,
                       z: scale
                   });
                   entity.setAttribute('gps-projected-entity-place', {
                       latitude: peak.geometry.coordinates[1],
                       longitude: peak.geometry.coordinates[0]
                   });
                   this.el.appendChild(entity);
               });
       });
   }*/
});

// The map
//<!-- include aframe -->
//<!-- with location based, use aframe v0.9.2 -->
//include("https://aframe.io/releases/0.9.2/aframe.min.js")
//<!-- include ar.js -->
//include("https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js")
/*
const map = new Mazemap.Map({
    container: "map",
    campuses: 341,
    center: { lng: -2.7922321418786713, lat: 54.01036998271985 },
    zoom: 18,
    zLevel: 1,
});

let lng;
let lat;
*/
/*navigator.geolocation.getCurrentPosition(function(position){
  lng = position.coords.longitude;
  lat = position.coords.latitude;

  console.log(lng);
  console.log(lat);
})*/
/*

// Add map navigation controls
map.addControl(new Mazemap.mapboxgl.NavigationControl());

// Placeholder start and end points using lat-long
const p2 = { lngLat: { lng: -2.784581, lat: 54.005382 }, zLevel: map.zLevel };

// Route controller will be set after the map has loaded
let route_controller;
var trigger = true;

map.on("load", () => {
    route_controller = new Mazemap.RouteController(map, {
        routeLineColorPrimary: "#0099EA",
        routeLineColorSecondary: "#888888",
    });

    // Set the route
    //set_route(p1, p2);
    */
  /*const blueDot = new Mazemap.BlueDot({
    map : map,
  }).setLngLat({lng : lng, lat : lat})
    .setZLevel(1)
    .setAccuracy(10)
    .show();
  */

    //BlueDot
    /*
  const blueDot = new Mazemap.BlueDot({
      map : map
  })
     .setAccuracy(10)
     .show();

  var locationController = new Mazemap.LocationController({
    blueDot: blueDot,
    map: map
  });
  locationController.setState('follow');
  const watchId = navigator.geolocation.watchPosition(position => {

    const { latitude, longitude } = position.coords;

    var testElement = document.querySelector("body > ascene > a-text")

    testElement.setAttribute("gps-entity-place", "latitude: " + latitude + "; longitude: " + longitude + ";")

    locationController.updateLocationData({
        lngLat: {
            lng: longitude,
            lat: latitude
        }
    })

    if(trigger) {
        set_route({ lngLat: { lng: longitude, lat: latitude }, zLevel: map.zLevel }, p2);
        trigger = false;
    }
  });*/
    //map.flyTo({center:{lng : longitude, lat : latitude}, zoom: 18});
    // Show a map centered at latitude / longitude.

  /*navigator.geolocation.getCurrentPosition(function(position){
    lng = position.coords.longitude;
    lat = position.coords.latitude;
  */
/*
});

function set_route(p1, p2) {
    // Remove previous route if present
    route_controller.clear();

    // Get route and show if succesful
    Mazemap.Data.getRouteJSON(p1, p2).then((geojson) => {
        console.log(geojson);

        // Set the route
        route_controller.setPath(geojson);

        // Fit the map bounds to the path bounds
        let bounds = Mazemap.Util.Turf.bbox(geojson);
        map.fitBounds(bounds, { padding: 100 });
    });
};
*/
// Get and set the route

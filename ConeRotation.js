document.addEventListener("DOMContentLoaded", function(e) {
    /*var cones = document.getElementsByTagName("a-cone");
    cones = Array.prototype.slice.call(cones);

    let lastCone = null;

    cones.forEach(cone => {
        if (lastCone !== null) {
            let lastConePosition = lastCone.getAttribute('position');
            let currentConePosition = cone.getAttribute('position');
            const xDelta = lastConePosition.x - currentConePosition.x; 
            const zDelta = lastConePosition.z - currentConePosition.z;
            let angle = Math.atan2(zDelta, xDelta) * 180 / Math.PI;
            console.log(xDelta);
            console.log(zDelta);
            console.log(angle);
            cone.setAttribute("rotation", "0 " + -angle + " 90");
            console.log(cone);
        }
        lastCone = cone;      
    });*/
    const scale = 5;
    fetch("../routeData.json")
	.then(response => {
		return response.json();
	})
	.then ( json => {
		const points = [];
		
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
		});
    });
  });
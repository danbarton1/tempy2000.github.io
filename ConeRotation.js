document.addEventListener("DOMContentLoaded", function(e) {
    var cones = document.getElementsByTagName("a-cone");
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
    });
  });
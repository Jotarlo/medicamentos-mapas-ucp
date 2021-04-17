function initMap() {
    const myLatLng = { lat: 4.9213766, lng: -74.3121914 };
    const map = new google.maps.Map(document.querySelector("#map"), {
        zoom: 11,
        center: myLatLng,
    });
    AgregarMarcadores(map);
}

function AgregarMarcadores(map) {
    fetch("https://www.datos.gov.co/resource/2938-dsak.json")
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            let heatmapData =[];
            datosJSON.forEach(punto => {
                let pos = {location: new google.maps.LatLng(parseFloat(punto.latitude),parseFloat(punto.longitude)), weight: 1 };
                
                //let pos = new google.maps.LatLng(parseFloat(punto.localizacion.latitude), parseFloat(punto.localizacion.longitude));
                heatmapData.push(pos);
                const latLon = { lat: parseFloat(punto.localizacion.latitude), lng: parseFloat(punto.localizacion.longitude) };
                new google.maps.Marker({
                    position: latLon,
                    map,
                    title: punto.nombre_del_hotel_o_restaurante,
                });
            });
            console.log(heatmapData)
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData
            });
            heatmap.setMap(map);


        })
}
// Aluskaardi tailid on L-EST'97s. seadistame kaardi.
// crs on "koordinaatsüsteem".
var crs = new L.Proj.CRS(
  'EPSG:3301',
  '+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 ' +
  '+lon_0=24 +x_0=500000 +y_0=6375000 ' +
  '+ellps=GRS80 ' +
  '+towgs84=0,0,0,0,0,0,0 ' +
  '+units=m +no_defs',
  {
    resolutions: [
      4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625,
      1.953125, 0.9765625, 0.48828125, 0.244140625, 0.1220703125, 0.06103515625,
      0.030517578125, 0.0152587890625, 0.00762939453125, 0.003814697265625
    ],
    transformation: new L.Transformation(1, -40500, -1, 7017000.000000),
    //origin: [40500, 5993000.000000],
    bounds: L.bounds(
      L.point(40500, 5993000.000000),
      L.point(1064500.000000, 7017000.000000)
    )
  }
);

// Kaart ise. Läheb div elementi "map".
var map = L.map(
  'Kaart',
  {
    crs: crs,
    center: L.latLng(59.391539, 24.683006),
    zoom: 15, // Oli: 7.
    minZoom: 3,
    maxZoom: 24,
    maxBounds: L.latLngBounds(
      [[53.87677644829216, 17.023771159524344],
      [62.85582385242469, 35.106036681873526]]),
  }
);

var baselayers = {};
var overlays = {};
var layerControl = L.control.groupedLayer(baselayers, overlays);

layerControl.addTo(map);

var aboutWindow = L.control.about();

updateMap(config.map);

initBasemaps(config.basemaps);

// GeoJSON faili lugemine.
// https://gis.stackexchange.com/questions/305646/import-local-geojson-file-into-leaflet

/*
function fetchJSON(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    });
}

var data = fetchJSON('kr_kaitsealaPolygon.geojson')
            .then(function(data) { return data });
L.geoJSON(data, {
  style: function (feature) {
      return {color: feature.properties.color};
  }
}).bindPopup(function (layer) {
  return layer.feature.properties.description;
}).addTo(map);
*/

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nimi);
}

// adding GeoJSON by fetch
fetch("kr_kaitsealaPolygon.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON
    L.geoJSON(data, {
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

// Hulknurgal klõpsamine. Allikas: https://jsfiddle.net/guspersson/yfe1g5zs/

//Handle click on polygon
var onPolyClick = function (event) {
  //callFancyboxIframe('flrs.html')
  document.getElementById('tunnus').innerHTML = event.target.options.tunnus;
  document.getElementById('aadress').innerHTML = event.target.options.aadress;
};

// Lisa hulknurgad.
for (const hulknurk of Hulknurgad) {
  var poly = new L.Polygon(hulknurk[2],
    {
      'tunnus': hulknurk[0],
      'aadress': hulknurk[1],
      /* Vt: https://leafletjs.com/reference.html#path */
      weight: 1,
      color: 'tomato',
      fillColor: 'tomato'
    }
  );
  poly.on('click', onPolyClick);

  //Add polygon to map
  poly.on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);
}

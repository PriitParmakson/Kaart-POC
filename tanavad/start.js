// Aluskaardi tailid on L-EST'97s. seadistame kaardi.
// crs on "koordinaatsüsteem".

var proj1 =
  '+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 ' +
  '+lon_0=24 +x_0=500000 +y_0=6375000 ' +
  '+ellps=GRS80 ' +
  '+towgs84=0,0,0,0,0,0,0 ' +
  '+units=m +no_defs',
  proj2 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ';

var crs = new L.Proj.CRS(
  'EPSG:3301',
  proj1,
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
    center: L.latLng(59.36876, 24.662562),
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

var keskpunkt = L.marker([59.36876, 24.662562]).addTo(map);

// Tänava nimi
function kuvaTänavaNimi(feature, layer) {
  var teeNimi = feature.properties.tee_nimi;
  var c1 = feature.geometry.coordinates[0][0];
  var c2 = feature.geometry.coordinates[0][1];
  console.log("c1, c2 = ", c1, c2);
  var marker = L.marker([c2, c1]).addTo(map);
  marker.bindTooltip(teeNimi, { permanent: true }).openTooltip();
  // marker.bindPopup(teeNimi).openPopup();
  // layer.bindPopup(teeNimi);
}

fetch("andmed_01.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON. Vt: https://leafletjs.com/examples/geojson/,
    // sh stiili määramine.
    L.geoJSON(data, {
      style: {
        color: 'tomato',
        weight: 5,
        fillColor: 'green',
        fillOpacity: 0
      },
      onEachFeature: kuvaTänavaNimi,
    }).addTo(map);
  });

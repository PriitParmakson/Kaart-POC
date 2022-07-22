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

function katPopup(feature, layer) {
  var content = feature.properties.TUNNUS + " " + 
  feature.properties.L_AADRESS + " " + feature.properties.OMVORM;
  layer.bindPopup(content);
}

// Puu/kännu ikoon
var myIcon = L.IconMaterial.icon({
  icon: 'cancel',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'saddlebrown',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

/*
L.marker([59.39343744, 24.68644707], {icon: myIcon})
  .bindTooltip("I").addTo(map);

L.marker([59.39267695, 24.68393739], {icon: myIcon})
  .bindTooltip("H").addTo(map);

  L.marker([59.39201754, 24.68194576], {icon: myIcon})
  .bindTooltip("A").addTo(map);

L.marker([59.39159206, 24.68009317], {icon: myIcon})
  .bindTooltip("B").addTo(map);

L.marker([59.39343138, 24.68731539], {icon: myIcon})
  .bindTooltip("K").addTo(map);
*/

var latlngs = [
  [59.39343744, 24.68644707], // I
  [59.39267695, 24.68393739], // H
  [59.39201754, 24.68194576], // A
  [59.39159206, 24.68009317], // B
  [59.39139665, 24.67998960], // C
  [59.39110559, 24.68074449], // D
  [59.39127560, 24.68157501], // E
  [59.39184967, 24.68321185], // F
  [59.39219781, 24.68431710], // G
  [59.39316919, 24.68694285], // J
  [59.39343138, 24.68731539]  // K
];

var polygon = L.polygon(latlngs, {color: 'green'}).addTo(map);

var textLatLng = [59.39201754, 24.68194576];  
var myTextLabel = L.marker(textLatLng, {
    icon: L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: '"Amazonas" — märgala Nõmme-Mustamäe maastikukaitsealal (Sütiste metsas)'
    }),
    zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);

/*
// Lisa katastriüksuste piirid
fetch("N_M_KAT.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON. Vt: https://leafletjs.com/examples/geojson/,
    // sh stiili määramine.
    L.geoJSON(data, {
      style: {
        color: 'tomato',
        weight: 1,
        fillColor: 'green',
        fillOpacity: 0
      },
      onEachFeature: katPopup,
    }).addTo(map);
  });


// Lisa MKA piir.

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nimi);
}

// fetch("kr_kaitsealaPolygon.geojson")
fetch("MKA.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON. Vt: https://leafletjs.com/examples/geojson/,
    // sh stiili määramine.
    L.geoJSON(data, {
      style: {
        color: 'green',
        weight: 3,
        fillColor: 'green',
        fillOpacity: 0
      },
      interactive: false
      // onEachFeature: onEachFeature,
    }).addTo(map);
  });

*/

// Leaflet Layers Control
// https://leafletjs.com/examples/layers-control/

// Leaflet API kokkuvõtlikult
// https://docs.eegeo.com/eegeo.js/v0.1.759/docs/leaflet/L.LayerGroup/

// Bubbling events
// https://codepen.io/jmfolds/pen/NvEbPN

// Leaflet: How to style my polygons in a GeoJSON layer?
// https://gis.stackexchange.com/questions/182986/leaflet-how-to-style-my-polygons-in-a-geojson-layer

// Layer Ordering in leaflet.js
// https://stackoverflow.com/questions/12848812/layer-ordering-in-leaflet-js


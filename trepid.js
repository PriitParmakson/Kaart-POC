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
    center: L.latLng(59.388118, 24.659502),
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

var Glehni_trepp = L.polyline(
  [
    [59.388496, 24.654055],
    [59.387756, 24.654636]
  ],
  {
    color: 'darkslategray',
    weight: 20,
    opacity: 0.4
  }).addTo(map);

var Trepi_tn_trepp = L.polyline(
  [
    [59.388969, 24.662284],
   [59.388609, 24.662289],
   [59.388142, 24.662021]
  ],
  {
    color: 'darkslategray',
    weight: 20,
    opacity: 0.4
  }).addTo(map);

var Hiiu_Suurtüki_tn_trepp = L.polyline(
  [
    [59.389102, 24.667746],
   [59.388791, 24.667468],
   [59.388467, 24.666985]
  ],
  {
    color: 'darkslategray',
    weight: 20,
    opacity: 0.4
  }).addTo(map);

  /*
  var Hüppetorni_trepp_1 = L.polyline(
    [
      [59.389102, 24.667746],
     [59.388791, 24.667468],
     [59.388467, 24.666985]
    ],
    {
      color: 'darkslategray',
      weight: 20,
      opacity: 0.4
    }).addTo(map);
  */

/*
var textLatLng = [59.39201754, 24.68194576];  
var myTextLabel = L.marker(textLatLng, {
    icon: L.divIcon({
        className: 'text-labels',   // Set class for CSS styling
        html: '"Amazonas" — märgala Nõmme-Mustamäe maastikukaitsealal (Sütiste metsas)'
    }),
    zIndexOffset: 1000     // Make appear above other map features
}).addTo(map);
*/

/*
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


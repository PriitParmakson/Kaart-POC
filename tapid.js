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

// Kuva punktid GPX-failist TAPID-01.gpx.
var gpx_01 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with BasicAirData GPS Logger for Android - ver. 3.1.4 -->
<!-- Track 15 = 269 TrackPoints + 11 Placemarks -->

<!-- Track Statistics (based on Total Time | Time in Movement): -->
<!--  Distance = 287 m -->
<!--  Duration = 07:59 | 01:49 -->
<!--  Altitude Gap = 51 m -->
<!--  Max Speed = 6 km/h -->
<!--  Avg Speed = 2,2 | 9,5 km/h -->
<!--  Direction = N -->
<!--  Activity = walking -->

<gpx version="1.0"
     creator="BasicAirData GPS Logger 3.1.4"
     xmlns="http://www.topografix.com/GPX/1/0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<name>GPS Logger 20220705-200832</name>
<desc>Täpid</desc>
<time>2022-07-05T19:31:17Z</time>
<keywords>walking</keywords>
<bounds minlat="59.39123388" minlon="24.68004806" maxlat="59.39259856" maxlon="24.68038859" />

<wpt lat="59.39125156" lon="24.68010480"><ele>17.337</ele><time>2022-07-05T17:08:36Z</time><name>P k</name><sat>17</sat></wpt>
<wpt lat="59.39139182" lon="24.68011641"><ele>35.405</ele><time>2022-07-05T17:08:57Z</time><name>P k</name><sat>9</sat></wpt>
<wpt lat="59.39148379" lon="24.68016329"><ele>54.144</ele><time>2022-07-05T17:09:13Z</time><name>R p</name><sat>9</sat></wpt>
<wpt lat="59.39157409" lon="24.68010134"><ele>51.738</ele><time>2022-07-05T17:09:35Z</time><name>R k</name><sat>9</sat></wpt>
<wpt lat="59.39159764" lon="24.68015492"><ele>53.342</ele><time>2022-07-05T17:09:47Z</time><name>P k</name><sat>18</sat></wpt>
<wpt lat="59.39167880" lon="24.68018229"><ele>54.389</ele><time>2022-07-05T17:10:08Z</time><name>R k</name><sat>22</sat></wpt>
<wpt lat="59.39183481" lon="24.68016958"><ele>58.569</ele><time>2022-07-05T17:10:30Z</time><name>R p</name><sat>24</sat></wpt>
<wpt lat="59.39195170" lon="24.68021315"><ele>53.328</ele><time>2022-07-05T17:10:54Z</time><name>R p</name><sat>22</sat></wpt>
<wpt lat="59.39216240" lon="24.68038406"><ele>58.878</ele><time>2022-07-05T17:11:16Z</time><name>R p</name><sat>22</sat></wpt>
<wpt lat="59.39237529" lon="24.68028575"><ele>52.302</ele><time>2022-07-05T17:11:45Z</time><name>R p</name><sat>21</sat></wpt>
<wpt lat="59.39182864" lon="24.68006972"><ele>63.736</ele><time>2022-07-05T17:16:06Z</time><name>P k</name><sat>20</sat></wpt>

</gpx>
 `;

new L.GPX(gpx_01, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': treeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failist TAPID-01.gpx.
var gpx_02 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with BasicAirData GPS Logger for Android - ver. 3.1.4 -->
<!-- Track 16 = 502 TrackPoints + 32 Placemarks -->

<!-- Track Statistics (based on Total Time | Time in Movement): -->
<!--  Distance = 230 m -->
<!--  Duration = 08:21 | 02:53 -->
<!--  Altitude Gap = -1 m -->
<!--  Max Speed = 10 km/h -->
<!--  Avg Speed = 1,7 | 4,8 km/h -->
<!--  Direction = ENE -->
<!--  Activity = walking -->

<gpx version="1.0"
     creator="BasicAirData GPS Logger 3.1.4"
     xmlns="http://www.topografix.com/GPX/1/0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<name>GPS Logger 20220705-201709</name>
<desc>Täpid 2</desc>
<time>2022-07-05T19:31:30Z</time>
<keywords>walking</keywords>
<bounds minlat="59.39092870" minlon="24.68024534" maxlat="59.39164511" maxlon="24.68369778" />

<wpt lat="59.39125426" lon="24.68025410"><ele>57.733</ele><time>2022-07-05T17:17:13Z</time><name>R p</name><sat>23</sat></wpt>
<wpt lat="59.39123789" lon="24.68044504"><ele>57.241</ele><time>2022-07-05T17:17:33Z</time><name>R p</name><sat>24</sat></wpt>
<wpt lat="59.39123792" lon="24.68047767"><ele>58.601</ele><time>2022-07-05T17:17:42Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39114049" lon="24.68071512"><ele>58.697</ele><time>2022-07-05T17:18:07Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39114631" lon="24.68069130"><ele>58.084</ele><time>2022-07-05T17:18:15Z</time><name>P k</name><sat>14</sat></wpt>
<wpt lat="59.39112151" lon="24.68078096"><ele>53.735</ele><time>2022-07-05T17:18:30Z</time><name>R p</name><sat>11</sat></wpt>
<wpt lat="59.39103151" lon="24.68109531"><ele>55.144</ele><time>2022-07-05T17:19:08Z</time><name>R k</name><sat>18</sat></wpt>
<wpt lat="59.39103805" lon="24.68121287"><ele>63.672</ele><time>2022-07-05T17:19:22Z</time><name>P k</name><sat>21</sat></wpt>
<wpt lat="59.39103205" lon="24.68128871"><ele>62.677</ele><time>2022-07-05T17:19:36Z</time><name>P k</name><sat>22</sat></wpt>
<wpt lat="59.39100283" lon="24.68161862"><ele>61.073</ele><time>2022-07-05T17:20:29Z</time><name>R k</name><sat>22</sat></wpt>
<wpt lat="59.39101306" lon="24.68165544"><ele>57.487</ele><time>2022-07-05T17:20:39Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39103759" lon="24.68165809"><ele>60.000</ele><time>2022-07-05T17:20:47Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39105586" lon="24.68163553"><ele>60.277</ele><time>2022-07-05T17:20:59Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39112208" lon="24.68194041"><ele>57.156</ele><time>2022-07-05T17:21:20Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39119976" lon="24.68225659"><ele>60.640</ele><time>2022-07-05T17:21:40Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39121536" lon="24.68231983"><ele>59.380</ele><time>2022-07-05T17:21:51Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39127591" lon="24.68259686"><ele>58.961</ele><time>2022-07-05T17:22:12Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39125920" lon="24.68264477"><ele>59.539</ele><time>2022-07-05T17:22:24Z</time><name>R k</name><sat>25</sat></wpt>
<wpt lat="59.39126598" lon="24.68266611"><ele>59.861</ele><time>2022-07-05T17:22:33Z</time><name>P k</name><sat>22</sat></wpt>
<wpt lat="59.39125970" lon="24.68266484"><ele>60.445</ele><time>2022-07-05T17:22:42Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39126006" lon="24.68266539"><ele>60.073</ele><time>2022-07-05T17:22:55Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39126153" lon="24.68267807"><ele>61.058</ele><time>2022-07-05T17:23:03Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39126424" lon="24.68272302"><ele>58.051</ele><time>2022-07-05T17:23:09Z</time><name>P k</name><sat>22</sat></wpt>
<wpt lat="59.39130811" lon="24.68278455"><ele>59.472</ele><time>2022-07-05T17:23:39Z</time><name>P k</name><sat>22</sat></wpt>
<wpt lat="59.39134928" lon="24.68283359"><ele>58.822</ele><time>2022-07-05T17:23:45Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39135055" lon="24.68283289"><ele>60.256</ele><time>2022-07-05T17:23:51Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39139479" lon="24.68295389"><ele>63.508</ele><time>2022-07-05T17:24:11Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39139821" lon="24.68296845"><ele>64.961</ele><time>2022-07-05T17:24:17Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39140428" lon="24.68300735"><ele>64.055</ele><time>2022-07-05T17:24:27Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39138037" lon="24.68304077"><ele>65.731</ele><time>2022-07-05T17:24:34Z</time><name>P k</name><sat>23</sat></wpt>
<wpt lat="59.39136177" lon="24.68304435"><ele>68.236</ele><time>2022-07-05T17:24:40Z</time><name>P k</name><sat>24</sat></wpt>
<wpt lat="59.39163482" lon="24.68368362"><ele>56.661</ele><time>2022-07-05T17:25:24Z</time><name>P k</name><sat>24</sat></wpt>

</gpx>
 `;

new L.GPX(gpx_02, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': treeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

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


# Tänavad

Nõmme (laiemalt: Tallinna) tänavate kaart.
- tänavad esiletõstetud

Käivitamine: https://priitparmakson.github.io/Kaart-POC/tanavad/index.html
- HTML: `tanavad/index.html`
- andmed: `tanavad/tanavad.json`
- Javascript: `tanavad/start.js`.

Kontseptsioon:
- Tee A :
  - Teeregistri WFS teenusest laadida GeoJSON andmed alla
  - ja kuvada Leaflet rakenduses
  - Tõke : GeoJSON on Eesti koordinaadistikus; teisendamine rahvusvahelisse (GPS) ei õnnestu
- Tee B :
  - Laadida GeoJSON alla Maa-ameti kaardiportaalist, Teeregistri rakendusest
    - Andmed on standardses (GPS) koordinaadistikus
    - Kasuta juhendit "X-GIS kaardirakendus. Kasutajajuhend"
      - Kaardirakenduses paremal "Abi" > Lae PDF alla
  - Kuva Leaflet rakenduses
- Tee C :
  - Saavutada soovitud tulemus Maa-ameti Teeregistri kaardirakenduse (kohandamise) abil
    - Aluskaardi paistvus -> väiksemaks

## Tee B : Märkmed

EPSG:4326, also known as the WGS84 projection (because it's based on WGS84's ellipsoid)
"Geographic Coordinate Systems 101: A Primer for Software Generalists"
https://8thlight.com/insights/geographic-coordinate-systems-101#:~:text=EPSG%3A4326%2C%20also%20known%20as,issues%20of%20the%20Web%20Mercator.

## Tee A : Märkmed
// Märkmed

// http://proj4js.org/

// https://gis.stackexchange.com/questions/116198/wfs-with-epsg3301-projection-using-leaflet

// https://github.com/kartena/Proj4Leaflet

// https://jsfiddle.net/j7vL6cdz/ 

// https://proj.org/en/9.3/ 

// https://www.perfectline.co/blog/2011/02/proj4js-l-est-and-geopoint/

// https://stackoverflow.com/questions/65164430/how-to-reproject-geojson-without-crs-property-to-wgs84-to-use-react-leaflet

// https://mygeodata.cloud/converter/


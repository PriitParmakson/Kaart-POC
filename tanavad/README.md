# Tänavad

Nõmme (laiemalt: Tallinna) tänavate kaart.
- tänavad esiletõstetud

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


// Defineerime võimalikud aluskaardid
// Kõik aluskaardid koosnevad kahest komponendist, mida kuvatakse
// vastavalt kaardi zoomile: kui on olemas kaardi kahheldatud versioon, siis
// seda ning suurematel zoomidel päritakse pildid wms teenustest. NB! Maa-ameti
// kihtide puhul tähendab see, et igale kahhelile lisatakse serveris väike
// "Maa-amet" vesimärk.

// MAA-AMETi aluskaardid

// Aluskaart.
var kaarttile = L.tileLayer(
  'https://tiles.maaamet.ee/tm/tms/1.0.0/kaart/{z}/{x}/{-y}.png',
  {
    minZoom: 0,
    maxZoom: 13,
    continuousWorld: false,
    noWrap: false,
    attribution: 'Aluskaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

var kaartwms = L.tileLayer.wms(
  'https://kaart.maaamet.ee/wms/kaart',
  {
    continuousWorld: false,
    layers: 'CORINE,BAASKAART,KAART24,HALDUSPIIRID,TEED,KYLAD,KAART24L',
    minZoom: 14,
    maxZoom: 20,
    version: '1.1.1',
    attribution: 'Aluskaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

// Lisatud 24.05.2022
var kaarthall = L.tileLayer.wms(
  'https://kaart.maaamet.ee/wms/hallkaart',
  {
    continuousWorld: false,
    minZoom: 14,
    maxZoom: 20,
    version: '1.1.1',
    attribution: 'Aluskaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
)

// Hübriid (ortofoto + hybriid).
var hybrid_orthotile = L.tileLayer(
  'https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{-y}.png',
  {
    minZoom: 0,
    maxZoom: 13,
    continuousWorld: false,
    attribution: 'Ortofoto/Hübriidkaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

var hybrid_texttile = L.tileLayer(
  'https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid/{z}/{x}/{-y}.png',
  {
    minZoom: 0,
    maxZoom: 13,
    continuousWorld: false,
    attribution: 'Ortofoto/Hübriidkaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

var hybrid_orthowms = L.tileLayer.wms(
  'https://kaart.maaamet.ee/wms/fotokaart',
  {
    layers: 'EESTIFOTO',
    minZoom: 14,
    maxZoom: 20,
    version: '1.1.1',
    attribution: 'Ortofoto/Hübriidkaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

var hybrid_textwms = L.tileLayer.wms(
  'https://kaart.maaamet.ee/wms/fotokaart',
  {
    layers: 'HYBRID',
    transparent: true,
    format: 'image/png',
    minZoom: 14,
    maxZoom: 20,
    version: '1.1.1',
    attribution: 'Ortofoto/Hübriidkaart: <a href="https://www.maaamet.ee" ' + 
    'target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
  }
);

var hybridtile = L.layerGroup([hybrid_orthotile, hybrid_texttile]);
var hybridwms = L.layerGroup([hybrid_orthowms, hybrid_textwms]);

// Tõstame kokku
var _baselayers = {
  "hybrid": {
    "title": "Hübriid",
    "constructor": L.layerGroup([hybridtile, hybridwms])
  },
  "kaart": {
    "title": "Aluskaart",
    // Lisatud 24.05.2022: kaarthall.
    "constructor": L.layerGroup([kaarttile, kaartwms])
  },
  "piirid": {
    "title": "Piirid",
    "constructor": L.layerGroup([kaarthall])
  }
};

function initBasemaps(keys) {
  var _map = layerControl._map,
    _layercount = keys.length,
    _last = keys[_layercount - 1],
    _lastlayer = _baselayers[_last]["constructor"]
  // Kui _layercoount == 0?
  keys.forEach(function (key) {
    try {
      addBasemapToControl(key);
    } catch (err) {
      console.error(err);
    }
  });
  _lastlayer.addTo(_map);
  // _baselayersist tuleks kustutada kõik need kihid, mis pole layerControli
  // lisatud. Kas me võime deleteda lihtsalt viite nii?
  delete _baselayers;
}

function addBasemapToControl(key) {
  // kui kihti pole `_baselayers`is defineeritud, siis tuleb viga kinni
  // püüda ja konsooli viga visata ning ülejäänud kihtidega edasi liikuda.
  var base = _baselayers[key]
  constr = base["constructor"],
    title = base["title"];
  layerControl.addBaseLayer(constr, title);
}

function updateMap(options) {
  var title = options.title != undefined ? options.title : document.title;
  var minZoom = options.minZoom != undefined ? options.minZoom : map.getMinZoom();
  var maxZoom = options.maxZoom != undefined ? options.maxZoom : map.getMaxZoom();
  var zoom = options.zoom != undefined ? options.zoom : minZoom;
  var radioGroups = options.radioGroups !== undefined ? options.radioGroups : [];

  aboutOnClick = options.aboutOnClick !== undefined ? options.aboutOnClick : false;

  document.title = title;
  map.setMinZoom(minZoom);
  map.setMaxZoom(maxZoom);
  map.setZoom(zoom);

  layerControl.options.radioGroups = radioGroups;

  aboutWindow.options.collapsed = aboutOnClick == false;
  aboutWindow.options.title = title;
}

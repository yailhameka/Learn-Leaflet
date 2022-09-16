// Best_url
let best_url = 'http://localhost/learn-leaflet';
// Constan Map
const map = L.map('map').setView({ lat: -0.085497, lon: 109.31773 }, 7);
// Url Openstrrer and max zoom
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);

async function pontianakPolygon() {
  // Fetch Data dengan Vanila Js, dengan penggabungan Url, dari base url menuju File yang dituju
  const response = await fetch(`${best_url}/geojson/bengkayang.geojson`);
  // membuat constan untung mengambil file json to geo json
  const data = await response.json();
  // Mensefesifikan const data pada feauture nya karna, Data Geojson berbentuk feautures collection
  let res = data.features[0];
  //   // Cetak untuk liat tile
  //   console.log(res.properties);
  //   menggunakan library leafet dengan L.geojson, untuk mengambil variable res
  L.geoJSON(res, {
    //   Merubah style dengan parameter feauture
    style: function (feature) {
      // mengembalikan warna
      return { color: '#ff0000' };
    },
    // menggunakan onEachfutre(seperti onclick) dan menerima L dan feauture sebagai parameter
    onEachFeature: function (feature, l) {
      // melakukan penggabungan string pada obbject Kota pada variable res
      l.bindPopup(`ini adalah kota : ${res.properties.Kota}`);
    },
    // Mengembalikan data menjadi map
  }).addTo(map);
}

async function kuburayaPolygon() {
  const response = await fetch(`${best_url}/geojson/sambas.geojson`);
  const data = await response.json();
  let res = data.features[0];
  console.log(res);
  L.geoJSON(res, {
    style: function (feature) {
      return { color: 'blue' };
    },
    onEachFeature: function (feature, l) {
      l.bindPopup(`ini adalah kota : ${res.properties.Kabupaten}`);
    },
  }).addTo(map);
}

// Memanggil polyonPontianak
pontianakPolygon();
kuburayaPolygon();

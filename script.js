function injectHTML() {

}

function initMap() {
  const map = L.map('map').setView([38.7849, -76.8721], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  }
  
function markerPlace(array, map) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
        layer.remove();
    }
  });
  
array.forEach((item, index) => {
  const {coordinates} = item.geocoded_column_1;
    L.marker([coordinates[1], coordinates[0]]).addTo(map);
    if (index === 0) {
      map.setView([coordinates[1], coordinates[0]], 10);
    }
  });
}

const page = initMap();

async function mainEvent() {
  if (arrayFromJson.data?.length > 0) {
    form.addEventListener('input', (event) => {
      //const filteredList = filterList(currentList, event.target.value);
      //injectHTML(filteredList);
      markerPlace();
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
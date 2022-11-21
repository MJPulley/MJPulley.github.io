function processSpeedCameras(list) {
    console.log('fired speed cameras list');
    const range = [...Array(15).keys()];
    const newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length);
      return list[index];
    });
    return newArray;
  }

function initMap() {
    console.log('initMap');
    const map = L.map('map').setView([38.9897, -76.9378], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  }
  
function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin); // The maximum is inclusive and the minimum is inclusive
}

function filterList (array, filterInputValue) {
  return array.filter((item) => {
    if (!item.posted_speed) { return; }
    const lowerCaseSpeed = item.posted_speed.toLowerCase();
    const lowerCaseQuery = filterInputValue.toLowerCase();
    return lowerCaseSpeed.includes(lowerCaseQuery);
  });
}

function processCameras(list) {
  console.log('cameras list');
  const range = [...Array(30).keys()];
  const listIndex = [];
  const newArray = range.map((item) => {
    let index = getRandomIntInclusive(0, list.length - 1);
    while (listIndex.includes(index)) {
      index = getRandomIntInclusive(0, list.length - 1);
    }
    listIndex.push(index);
    return list[index];
  });
  return newArray;
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
    console.log(item.location_1);

    const northSouth = item.location_1.latitude;
    const eastWest = item.location_1.longitude;

    speedCameraMarker = L.marker([northSouth, eastWest]).addTo(map);

    if (index === 0) {
      map.setView([northSouth, eastWest], 10);
    }

    const address = item.street_address;
    const postedSpeed = item.posted_speed;
    const district = item.district;

    speedCameraMarker.bindPopup(`Address: ${address}<br>Posted Speed: ${postedSpeed}<br>District: ${district}`);
  });
}

async function getData() {
  const url = 'https://data.princegeorgescountymd.gov/resource/mnkf-cu5c.json';
  const data = await fetch(url);
  const json = await data.json();
  const reply = json.filter((item) => Boolean(item.location_1)).filter((item) => Boolean(item.posted_speed));
  return reply;
}

async function mainEvent() {
  const pageMap = initMap();
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('#get-resto');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  submit.style.display = 'none';

  const mapData = await getData();

  if (mapData?.length > 0) {
    submit.style.display = 'block';

    loadAnimation.classList.remove('lds-ellipsis');
    loadAnimation.classList.add('lds-ellipsis_hidden');

    let cameraList = [];

    form.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      const filteredList = filterList(cameraList, event.target.value);
      console.log(filteredList);
      markerPlace(filteredList, pageMap);
    });
    
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      cameraList = processCameras(mapData);
      console.log(cameraList);
      markerPlace(cameraList, pageMap);
    });
  }
}
document.addEventListener('DOMContentLoaded', async () => mainEvent());
/* global L */

import "../leaflet/leaflet.min.js";

export default class MapView extends HTMLElement {
    constructor() {
        super();

        this.places = [];
        this.map = {};
    }

    async connectedCallback() {
        const response = await fetch("http://localhost:8545/places");
        const result = await response.json();

        this.places = result.data;

        this.render();
    }

    render() {
        this.innerHTML = `<div id="map" class="map"></div>`;

        this.renderMap();
    }

    renderMap() {
        this.map = L.map('map').setView([56.18219, 15.59094], 11);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.renderMarkers();
        this.renderLocation();
    }

    renderMarkers() {
        this.places.forEach((place) => {
            let coordinates = [place.latitude, place.longitude];

            L.marker(coordinates).bindPopup(`<h2>${place.name}</h2><img src="${place.url}" width="150" height="150">`).addTo(this.map);
        });
    }

    renderLocation() {
        let locationMarker = L.icon({
            iconUrl:      "leaflet/location.png",
            iconSize:     [24, 24],
            iconAnchor:   [12, 12],
            popupAnchor:  [0, 0]
        });


        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                L.marker(
                    [position.coords.latitude,                  position.coords.longitude],
                    {icon: locationMarker}
                ).addTo(this.map);
            });
        }
    }
}

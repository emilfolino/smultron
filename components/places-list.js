export default class PlacesList extends HTMLElement {
    constructor() {
        super();

        this.places = [];
    }

    async connectedCallback() {
        const response = await fetch("https://smultron-backend.emilfolino.se/places");
        const result = await response.json();

        this.places = result.data;

        this.render();
    }

    render() {
        const list = this.places.map((place) => {
            return `<single-place place='${JSON.stringify(place)}'></single-place>`;
        }).join("");

        this.innerHTML = `<h1>Places</h1><a href='#form'>Skapa ny plats</a>${list}`;
    }
}

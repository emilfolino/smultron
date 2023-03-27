export default class SinglePlace extends HTMLElement {
    static get observedAttributes() {
        return ['place'];
    }

    get place() {
        return JSON.parse(this.getAttribute("place"));
    }

    connectedCallback() {
        let currentPlace = this.place;

        this.innerHTML = `
            <img src="${currentPlace.url}" alt="${currentPlace.name}" />
            <div>
                <h2>${currentPlace.name}</h2>
                <p>${currentPlace.username}</p>
                <p>(${currentPlace.latitude}, ${currentPlace.longitude})
            </div>
            `;
    }
};

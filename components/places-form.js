import auth from "../models/auth.js";

export default class PlacesForm extends HTMLElement {
    constructor() {
        super();

        this.place = {};
        this.latitude = "";
        this.longitude = "";
    }

    async createPlace() {
        console.log(this.place);

        const response = await fetch("https://smultron-backend.emilfolino.se/places", {
            body: JSON.stringify(this.place),
            headers: {
              'content-type': 'application/json',
              'x-access-token': auth.token,
            },
            method: 'POST'
        });

        const result = await response.json();

        location.hash = "";
    }

    connectedCallback() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                this.place = {
                    ...this.place,
                    latitude: this.latitude,
                    longitude: this.longitude,
                };

                this.render();
            });
        }
    }

    render() {
        if (!auth.token) {
            location.hash = "login";
        }

        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            console.log("submit", event);
            event.preventDefault();

            this.place = {
                ...this.place,
                url: document.getElementById("hidden-url").value,
            };

            this.createPlace();
        });

        let labelName = document.createElement("label");

        labelName.classList.add("input-label");
        labelName.textContent = "Namn";

        let inputName = document.createElement("input");

        inputName.setAttribute("type", "text");
        inputName.setAttribute("required", "required");
        inputName.classList.add("input");

        inputName.addEventListener("input", (event) => {
            this.place = {
                ...this.place,
                name: event.target.value,
            };
        });


        // let labelUrl = document.createElement("label");
        //
        // labelUrl.classList.add(".input-label");
        // labelUrl.textContent = "Bild url";
        //
        // let inputUrl = document.createElement("input");
        //
        // inputUrl.setAttribute("type", "text");
        // inputUrl.setAttribute("required", "required");
        // inputUrl.classList.add("input");
        //
        // inputUrl.addEventListener("input", (event) => {
        //     this.place = {
        //         ...this.place,
        //         url: event.target.value,
        //     };
        // });


        // let labelLat = document.createElement("label");
        //
        // labelLat.classList.add(".input-label");
        // labelLat.textContent = "Breddgrad";
        //
        // let inputLat = document.createElement("input");
        //
        // inputLat.setAttribute("type", "number");
        // inputLat.setAttribute("required", "required");
        // inputLat.setAttribute("step", "0.000000001");
        // inputLat.setAttribute("disabled", true);
        // inputLat.value = this.latitude;
        //
        // inputLat.classList.add("input");
        //
        //
        // let labelLong = document.createElement("label");
        //
        // labelLong.classList.add(".input-label");
        // labelLong.textContent = "Längdgrad";
        //
        // let inputLong = document.createElement("input");
        //
        // inputLong.setAttribute("type", "number");
        // inputLong.setAttribute("required", "required");
        // inputLong.setAttribute("step", "0.000000001");
        // inputLong.classList.add("input");
        // inputLong.setAttribute("disabled", true);
        // inputLong.value = this.longitude;


        // let labelUser = document.createElement("label");
        //
        // labelUser.classList.add(".input-label");
        // labelUser.textContent = "Användare";
        //
        // let inputUser = document.createElement("input");
        //
        // inputUser.setAttribute("type", "number");
        // inputUser.setAttribute("required", "required");
        // inputUser.classList.add("input");
        //
        // inputUser.addEventListener("input", (event) => {
        //     this.place = {
        //         ...this.place,
        //         user_id: parseInt(event.target.value),
        //     };
        // });

        let hiddenImageUrl = document.createElement("input");

        hiddenImageUrl.setAttribute("type", "hidden");
        hiddenImageUrl.id = "hidden-url";

        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.value = "Skapa plats";

        submitButton.classList.add("button", "blue-button");

        form.appendChild(labelName);
        form.appendChild(inputName);

        // form.appendChild(labelUrl);
        form.appendChild(hiddenImageUrl);
        //
        // form.appendChild(labelLat);
        // form.appendChild(inputLat);
        //
        // form.appendChild(labelLong);
        // form.appendChild(inputLong);

        // form.appendChild(labelUser);
        // form.appendChild(inputUser);

        form.appendChild(submitButton);

        this.innerHTML = `<h1>Skapa ny plats</h1><camera-component></camera-component>`;
        this.appendChild(form);
    }
}

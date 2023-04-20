import auth from "../models/auth.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        this.credentials = {};
    }

    async login() {
        const result = await auth.login(this.credentials);

        if (result === "ok") {
            location.hash = "form";
        } else {
            console.log("errors");
        }
    }

    connectedCallback() {
        this.innerHTML = `<h1>Logga in</h1>`;

        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            this.login();
        });

        let emailLabel = document.createElement("label");

        emailLabel.textContent = "E-post";
        emailLabel.classList.add("input-label");

        let emailInput = document.createElement("input");

        emailInput.classList.add("input");
        emailInput.setAttribute("type", "email");

        emailInput.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                email: event.target.value,
            };
        });

        let passwordLabel = document.createElement("label");

        passwordLabel.textContent = "Lösenord";
        passwordLabel.classList.add("input-label");

        let passwordInput = document.createElement("input");

        passwordInput.classList.add("input");
        passwordInput.setAttribute("type", "password");

        passwordInput.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password: event.target.value,
            };
        });


        let submitButton = document.createElement("button");

        submitButton.textContent = "Logga in";
        submitButton.classList.add("button", "green-button");

        form.appendChild(emailLabel);
        form.appendChild(emailInput);

        form.appendChild(passwordLabel);
        form.appendChild(passwordInput);

        form.appendChild(submitButton);

        this.appendChild(form);
    }
}

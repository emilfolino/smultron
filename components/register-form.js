export default class RegisterForm extends HTMLElement {
    constructor() {
        super();

        this.credentials = {};
    }


    connectedCallback() {
        this.innerHTML = "<h1>Registrera</h1>";
    }

}

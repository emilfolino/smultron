export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<places-list></places-list>",
                name: "Lista",
            },
            "form": {
                view: "<places-form></places-form>",
                name: "Formulär",
            }
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener("hashchange", (event) => {
            event.preventDefault();

            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        this.currentRoute = location.hash.replace("#", "");

        this.render();
    }

    render() {
        this.innerHTML = this.routes[this.currentRoute].view;
    }
}

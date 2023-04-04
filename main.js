import Router from "./router.js";

import PlacesList from "./components/places-list.js";
import PlacesForm from "./components/places-form.js";
import SinglePlace from "./components/single-place.js";

customElements.define("router-outlet", Router);

customElements.define("places-list", PlacesList);
customElements.define("single-place", SinglePlace);
customElements.define("places-form", PlacesForm);

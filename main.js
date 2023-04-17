import Router from "./router.js";

import PlacesList from "./components/places-list.js";
import PlacesForm from "./components/places-form.js";
import SinglePlace from "./components/single-place.js";
import LoginForm from "./components/login-form.js";
import RegisterForm from "./components/register-form.js";

customElements.define("router-outlet", Router);

customElements.define("places-list", PlacesList);
customElements.define("single-place", SinglePlace);
customElements.define("places-form", PlacesForm);
customElements.define("login-form", LoginForm);
customElements.define("register-form", RegisterForm);

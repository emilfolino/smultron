const auth = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb0BidGguc2UiLCJ1c2VyX2lkIjoxLCJpYXQiOjE2ODIzMzkyNTQsImV4cCI6MTY4MjQyNTY1NH0.QdyVRetVsGdc4psumjg_3dZb3UDjb_33Scm2Be_lXEA",

    login: async function login(credentials) {
        const response = await fetch("http://localhost:8545/auth/login", {
            body: JSON.stringify(credentials),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (result.hasOwnProperty("data")) {
            auth.token = result.data.token;

            return "ok";
        }

        return "not ok";
    },

    register: async function register(credentials) {

    },
};

export default auth;

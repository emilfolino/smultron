const auth = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb0BidGguc2UiLCJ1c2VyX2lkIjoxLCJpYXQiOjE2ODMxMDMxOTQsImV4cCI6MTY4MzE4OTU5NH0.945EL2wPxf_WM0md_zE6K3libKZ1Sk8YnrCdLzdunv8",

    login: async function login(credentials) {
        const response = await fetch("https://smultron-backend.emilfolino.se/auth/login", {
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

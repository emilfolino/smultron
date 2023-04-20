const auth = {
    token: "",

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

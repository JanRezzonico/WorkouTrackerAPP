import AsyncStorage from "@react-native-async-storage/async-storage";
//const BASE_URL = "http://10.4.25.11:3000/api";
//const BASE_URL = "http://10.4.25.23:3000/api";
const BASE_URL = "http://10.4.25.27:3000/api";
//const BASE_URL = "http://10.4.25.11:3000/api";
const saveId = async (data) => {
    if (data._id) {
        try {
            await AsyncStorage.setItem('_id', data._id);
            global.USER_ID = data._id;
        } catch (e) {

        }
    }else{

    }
}

const DB = {
    user: {
        async get() {
            try {
                console.log(`${BASE_URL}/user/${global.USER_ID}`);
                const response = await fetch(`${BASE_URL}/user/${global.USER_ID}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
        async post(user) {
            const response = await fetch(`${BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            return data;
        },
    },
    session: {
        async get() {
            try {
                const response = await fetch(`${BASE_URL}/session/${global.USER_ID}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
        async post(session) {
            const response = await fetch(`${BASE_URL}/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session),
            });
            const data = await response.json();
            return data;
        },
    },
    auth: {
        async login(username, password) {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log(data);
            await saveId(data);
            return data.message;
        },
        async signup(user) {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            console.log(data);
            await saveId(data);
        }
    }
};

export default DB;
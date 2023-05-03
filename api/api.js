import AsyncStorage from "@react-native-async-storage/async-storage";
import { logger, consoleTransport } from "react-native-logs";
//const BASE_URL = "http://10.4.25.11:3000/api";
//const BASE_URL = "http://10.4.25.23:3000/api";
//const BASE_URL = "http://192.168.1.29:3000/api";
//const BASE_URL = "http://10.4.25.11:3000/api";
//const BASE_URL = "http://10.4.25.23:3000/api";
const BASE_URL = "http://192.168.1.122:3000/api";
//const BASE_URL = "http://192.168.1.29:3000/api";
//const BASE_URL = "http://10.4.25.27:3000/api";
//const BASE_URL = "http://10.4.25.11:3000/api";
//const BASE_URL = "https://workoutracker-5xep.onrender.com/api";


const defaultConfig = {
    levels: {
        info: 1,
        warn: 2,
        error: 3,
    },
    severity: "info",
    transport: consoleTransport,
    transportOptions: {
        colors: {
            info: "blueBright",
            warn: "yellowBright",
            error: "redBright",
        },
    },
    async: true,
    dateFormat: "time",
    printLevel: true,
    printDate: true,
    enabled: true,
};

const LOG = logger.createLogger(defaultConfig);

const saveId = async (data) => {
    if (data._id) {
        try {
            await AsyncStorage.setItem('_id', data._id);
            global.USER_ID = data._id;
            LOG.info(`User ID saved: ${data._id}`);
        } catch (e) {
            LOG.error(`Error saving user ID: ${e}`);
        }
    } else {
        LOG.warn(`Invalid user data: ${JSON.stringify(data)}`);
    }
}

const DB = {
    user: {
        async get() {
            try {
                const response = await fetch(`${BASE_URL}/user/${global.USER_ID}`);
                const data = await response.json();
                LOG.info(`User data retrieved: ${JSON.stringify(data)}`);
                return data;
            } catch (error) {
                LOG.error(`Error getting user data: ${error}`);
                return null;
            }
        },
        async post(user) {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                const data = await response.json();
                LOG.info(`User data posted: ${JSON.stringify(data)}`);
                return data;
            } catch (error) {
                LOG.error(`Error posting user data: ${error}`);
                return null;
            }
        },
        async update(user) {
            try {
                const response = await fetch(`${BASE_URL}/user/${global.USER_ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                const data = await response.json();
                LOG.info(`User data updated: ${JSON.stringify(data)}`);
                return data;
            } catch (error) {
                LOG.error(`Error updating user data: ${error}`);
                return null;
            }
        },
    },
    session: {
        async get() {
            try {
                const response = await fetch(`${BASE_URL}/session/${global.USER_ID}`);
                const data = await response.json();
                LOG.info(`Session data retrieved: ${JSON.stringify(data)}`);
                return data;
            } catch (error) {
                LOG.error(`Error getting session data: ${error}`);
                return null;
            }
        },
        async post(session) {
            try {
                const response = await fetch(`${BASE_URL}/session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(session),
                });
                const data = await response.json();
                LOG.info(`Session data posted: ${JSON.stringify(data)}`);
                return data;
            } catch (error) {
                LOG.error(`Error posting session data: ${error}`);
                return null;
            }
        },
    },
    auth: {
        async login(username, password) {
            try {
                const response = await fetch(`${BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                LOG.info(`Login successful: ${JSON.stringify(data)}`);
                await saveId(data);
                return data.message;
            } catch (error) {
                LOG.error(`Login failed: ${error}`);
                return null;
            }
        },
        async signup(user) {
            try {
                const response = await fetch(`${BASE_URL}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                LOG.info(`Signup successful: ${JSON.stringify(data)}`);
                await saveId(data);
            } catch (error) {
                LOG.error(`Signup failed: ${error}`);
            }
        },
    },
};


export default DB;
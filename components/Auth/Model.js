import DB from "../../api/api";
import constants from "../../constants/constants";

const isBetween = (value, min, max) => {
    return value >= min && value < max;
}

const allValid = (user) => {
    const allFilled = Object.values(user).every((value) => !!value);
    const validHeight = isBetween(user.height, constants.HEIGHT_MIN, constants.HEIGHT_MAX);
    const validWeight = isBetween(user.weight, constants.WEIGHT_MIN, constants.WEIGHT_MAX);
    const validBirthday = isBetween(user.birthday.getTime(), new Date(1900, 0, 1).getTime(), Date.now());
    return allFilled && validHeight && validWeight && validBirthday;
}

export const handleSignup = async (user, onLogin, setMessage) => {
    if (!allValid(user)) {
        setMessage("All fields are required. Insert valid values.");
        return;
    }
    await DB.auth.signup(user);
    onLogin();
}

export const handleLogin = async (username, password, onLogin, setMessage) => {
    if (!(username && password)) {
        setMessage("Username and password fields are required");
        return;
    }
    let data = await DB.auth.login(username, password);
    setMessage(data.message);
    onLogin();
}
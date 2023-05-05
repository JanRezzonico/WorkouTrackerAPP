import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import colors from "../../../assets/style/colors";


{/**
    A simple timer function that represents the workout duration
*/}
const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

    return (
        <View>
            <Text style={{ color: colors.TEXT }}> Time: {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{formattedSeconds}</Text>
        </View>
    );
};

export default Timer;
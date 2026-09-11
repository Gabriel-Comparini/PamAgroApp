import { Alert, Text, View } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { RotateCw, Vibrate } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Accelerometer, Gyroscope } from "expo-sensors";

type SensorData = { x: number; y: number; z: number };

const SensorScreen = () => {
    const [accel, setAccel] = useState<SensorData | null>(null);
    const [gyro, setGyro] = useState<SensorData | null>(null);
    const lastAlert = useRef(0);

    useEffect(() => {
        Accelerometer.setUpdateInterval(500);
        Gyroscope.setUpdateInterval(500);

        const accelSub = Accelerometer.addListener((data) => {
            setAccel(data);
            const total = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
            if (total > 2.0 && Date.now() - lastAlert.current > 3000) {
                lastAlert.current = Date.now();
                Alert.alert("Instabilidade física detectada.", "Acelerômetro passou de 2.0g de força.");
            }
        });

        const gyroSub = Gyroscope.addListener((data) => {
            setGyro(data);
        });

        return () => {
            accelSub.remove();
            gyroSub.remove();
        };
    }, []);

    return(
        <ContentBody>
            <View style={ styles.container }>
                <Text style={{ fontSize: 25, fontWeight:"bold", color: "#4d4c4c", marginBottom: 10 }}>
                    Sensores
                </Text>

                <View style={ styles.itemContainer }>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#e0bc58" }] }>
                        <Vibrate color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Acelerômetro
                        </Text>
                        <Text>
                            {accel ? `x: ${accel.x.toFixed(2)}  y: ${accel.y.toFixed(2)}  z: ${accel.z.toFixed(2)}` : "Carregando..."}
                        </Text>
                    </View>
                </View>

                <View style={ styles.itemContainer }>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#e0bc58" }] }>
                        <RotateCw color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Giroscópio
                        </Text>
                        <Text>
                            {gyro ? `x: ${gyro.x.toFixed(2)}  y: ${gyro.y.toFixed(2)}  z: ${gyro.z.toFixed(2)}` : "Carregando..."}
                        </Text>
                    </View>
                </View>
            </View>
        </ContentBody>
    );
}

export default SensorScreen;

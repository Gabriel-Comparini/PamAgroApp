import { Alert, Text, View } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";

const LocationScreen = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const loadLocation = async () => {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissão Negada", "Permissão para acessar localização foi negada.");
            return;
        }

        try {
            const location = await getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        } catch (err) {
            Alert.alert("Erro", "Ocorreu um erro ao carregar a localização.");
            console.log(err);
        }
    };

    useEffect(() => {
        loadLocation();
    }, []);

    return(
        <ContentBody>
            <View style={ styles.container }>
                <Text style={{ fontSize: 25, fontWeight:"bold", color: "#4d4c4c", marginBottom: 10 }}>
                    Localização
                </Text>

                <View style={ styles.itemContainer }>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#92ca63" }] }>
                        <MapPin color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Latitude
                        </Text>
                        <Text>
                            {latitude ?? "Carregando..."}
                        </Text>
                    </View>
                </View>

                <View style={ styles.itemContainer }>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#92ca63" }] }>
                        <MapPin color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Longitude
                        </Text>
                        <Text>
                            {longitude ?? "Carregando..."}
                        </Text>
                    </View>
                </View>
            </View>
        </ContentBody>
    );
}

export default LocationScreen;

import { Pressable, Text, View } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { Book, Camera, Contact, MapPin, Vibrate } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const MainMenu = () => {
    const Navigation = useNavigation<any>();

    return(
        <ContentBody>
            <View style={ styles.container }>
                <Text style={{ fontSize: 25, fontWeight:"bold", color: "#4d4c4c", marginBottom: 10 }}>
                    Funcionalidades
                </Text>

                <Pressable style={ styles.itemContainer } onPress={() => Navigation.navigate("ContactScreen")}>
                    <View style={ styles.itemPfpContainer }>
                        <Contact color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Contatos
                        </Text>
                        <Text>
                            É possível ver a lista de contatos.
                        </Text>
                    </View>
                </Pressable>

                <Pressable style={ styles.itemContainer } onPress={() => Navigation.navigate("LocationScreen")}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#92ca63" }] }>
                        <MapPin color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Localização
                        </Text>
                        <Text>
                            É possível ver longitude e latitude do dispositivo.
                        </Text>
                    </View>
                </Pressable>

                <Pressable style={ styles.itemContainer } onPress={() => Navigation.navigate("GalleryScreen")}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#b68ad3" }] }>
                        <Camera color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Galeria
                        </Text>
                        <Text>
                            É possível tirar fotos ou selecioná-las da galeria.
                        </Text>
                    </View>
                </Pressable>

                <Pressable style={ styles.itemContainer } onPress={() => Navigation.navigate("SensorScreen")}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#e0bc58" }] }>
                        <Vibrate color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Sensores
                        </Text>
                        <Text>
                            É possível analisar o valor de sensores do dispositivo.
                        </Text>
                    </View>
                </Pressable>

                <Pressable style={ styles.itemContainer } onPress={() => Navigation.navigate("")}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#e27831" }] }>
                        <Book color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Formulário
                        </Text>
                        <Text>
                            Salve um formulário com os dados inseridos.
                        </Text>
                    </View>
                </Pressable>
            </View>
        </ContentBody>
    );
}

export default MainMenu;
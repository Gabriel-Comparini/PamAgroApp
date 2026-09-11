import { Pressable, Text, View, Alert, Linking, Image } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@gallery:imageUri";

const GalleryScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const save = async (uri: string) => {
        setImageUri(uri);
        await AsyncStorage.setItem(KEY, uri);
    };

    const deniedAlert = (message: string) => {
        Alert.alert("Permissão Negada", message);
    };

    const selectImage = async () => {
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            if(!canAskAgain) {
                Alert.alert("Permissão Negada", "Atualizar acesso a galeria manualmente (configurações)",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel"
                        },
                        {
                            text: "Configurações",
                            onPress: () => Linking.openSettings()
                        }
                    ]
                )
                return;
            } 
            deniedAlert("Permissão para acessar a galeria foi negada.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (result.canceled || !result.assets?.[0]?.uri) {
            return;
        }

        await save(result.assets[0].uri);
    }

    const takePhoto = async () => {
        const { status, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            if(!canAskAgain) {
                Alert.alert("Permissão Negada", "Atualizar acesso a câmera manualmente (configurações)",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel"
                        },
                        {
                            text: "Configurações",
                            onPress: () => Linking.openSettings()
                        }
                    ]
                )
                return;
            }
            deniedAlert("Permissão para acessar a câmera foi negada.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1
        });

        if (result.canceled || !result.assets?.[0]?.uri) {
            return;
        }

        await save(result.assets[0].uri);
    }

    useEffect(() => {
        AsyncStorage.getItem(KEY).then((uri) => {
            if (uri) setImageUri(uri);
        });
    }, []);

    return(
        <ContentBody>
            <View style={ styles.container }>
                <Text style={{ fontSize: 25, fontWeight:"bold", color: "#4d4c4c", marginBottom: 10 }}>
                    Galeria
                </Text>

                <Pressable style={ styles.itemContainer } onPress={takePhoto}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#b68ad3" }] }>
                        <Camera color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Tirar foto
                        </Text>
                        <Text>
                            Use a câmera para tirar uma foto.
                        </Text>
                    </View>
                </Pressable>

                <Pressable style={ styles.itemContainer } onPress={selectImage}>
                    <View style={ [styles.itemPfpContainer, { backgroundColor: "#b68ad3" }] }>
                        <ImageIcon color={"#fff"} size={60} />
                    </View>
                    <View style={ styles.itemTextContainer }>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Abrir galeria
                        </Text>
                        <Text>
                            Selecione uma imagem da galeria.
                        </Text>
                    </View>
                </Pressable>

                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={ styles.image } />
                ) : (
                    <Text>Nenhuma imagem selecionada</Text>
                )}
            </View>
        </ContentBody>
    );
}

export default GalleryScreen;

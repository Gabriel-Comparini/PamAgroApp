import { Pressable, Text, View, Alert, Linking, Image } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const GalleryScreen = () => {
    const [imageUri, setImageUri] = useState("");

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
            Alert.alert("Permissão Negada", "Permissão para acessar a galeria foi negada.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (result.canceled) {
            Alert.alert("Operação Cancelada", "Você cancelou a seleção de imagem");
            result;
        }

        if(result.assets === null) return;

        // setImageUri(result.uri);
        setImageUri(result.assets[0].uri);
    }

    return(
        <ContentBody>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={""} />
            )}
        </ContentBody>
    );
}

export default GalleryScreen;
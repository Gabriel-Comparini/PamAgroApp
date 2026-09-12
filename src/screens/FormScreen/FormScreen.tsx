import { Alert, FlatList, Image, Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { Camera, History, Image as ImageIcon, MapPin, Send, Trash2, User, Vibrate } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@form:history";

type AccelData = { x: number; y: number; z: number };

type FormEntry = {
    id: string;
    nome: string;
    imageUri: string | null;
    latitude: number | null;
    longitude: number | null;
    accel: AccelData | null;
    totalG: number | null;
    exceeded2g: boolean;
    createdAt: string;
};

const FormScreen = () => {
    const [nome, setNome] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [accel, setAccel] = useState<AccelData | null>(null);
    const [totalG, setTotalG] = useState<number | null>(null);
    const [history, setHistory] = useState<FormEntry[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const lastAlert = useRef(0);

    const exceeded = totalG !== null && totalG > 2.0;

    useEffect(() => {
        Accelerometer.setUpdateInterval(500);
        const sub = Accelerometer.addListener((data) => {
            setAccel(data);
            const total = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
            setTotalG(total);
            if (total > 2.0 && Date.now() - lastAlert.current > 3000) {
                lastAlert.current = Date.now();
                Alert.alert("Instabilidade física detectada.", "Acelerômetro passou de 2.0g de força.");
            }
        });
        return () => sub.remove();
    }, []);

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

    const loadHistory = async () => {
        try {
            const raw = await AsyncStorage.getItem(KEY);
            if (raw) setHistory(JSON.parse(raw));
        } catch (err) {
            console.log(err);
            setHistory([]);
        }
    };

    useEffect(() => {
        loadLocation();
        loadHistory();
    }, []);

    const deniedAlert = (message: string) => {
        Alert.alert("Permissão Negada", message);
    };

    const permissionAlertSettings = (message: string) => {
        Alert.alert("Permissão Negada", message,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Configurações", onPress: () => Linking.openSettings() }
            ]
        );
    };

    const selectImage = async () => {
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            if (!canAskAgain) {
                permissionAlertSettings("Atualizar acesso a galeria manualmente (configurações)");
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
        if (result.canceled || !result.assets?.[0]?.uri) return;
        setImageUri(result.assets[0].uri);
    };

    const takePhoto = async () => {
        const { status, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            if (!canAskAgain) {
                permissionAlertSettings("Atualizar acesso a câmera manualmente (configurações)");
                return;
            }
            deniedAlert("Permissão para acessar a câmera foi negada.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1
        });
        if (result.canceled || !result.assets?.[0]?.uri) return;
        setImageUri(result.assets[0].uri);
    };

    const handleSubmit = async () => {
        if (nome.trim() === "") {
            Alert.alert("Campo obrigatório", "Digite o nome da pessoa antes de enviar.");
            return;
        }
        const entry: FormEntry = {
            id: String(Date.now()),
            nome: nome.trim(),
            imageUri,
            latitude,
            longitude,
            accel,
            totalG,
            exceeded2g: exceeded,
            createdAt: new Date().toLocaleString("pt-BR")
        };
        try {
            const next = [entry, ...history];
            await AsyncStorage.setItem(KEY, JSON.stringify(next));
            setHistory(next);
            setNome("");
            setImageUri(null);
            Alert.alert("Formulário salvo", exceeded ? "Salvo com alerta: passou de 2g." : "Dados salvos no histórico.");
        } catch (err) {
            Alert.alert("Erro", "Ocorreu um erro ao salvar o formulário.");
            console.log(err);
        }
    };

    const removeItem = async (id: string) => {
        try {
            const next = history.filter((item) => item.id !== id);
            await AsyncStorage.setItem(KEY, JSON.stringify(next));
            setHistory(next);
        } catch (err) {
            Alert.alert("Erro", "Ocorreu um erro ao excluir o registro.");
            console.log(err);
        }
    };

    const clearAll = async () => {
        Alert.alert("Limpar histórico", "Deseja apagar todos os formulários salvos?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem(KEY);
                        setHistory([]);
                    }
                }
            ]
        );
    };

    const renderHistoryItem = ({ item }: { item: FormEntry }) => (
        <View style={styles.itemContainer}>
            <View style={[styles.itemPfpContainer, { backgroundColor: "#e27831" }]}>
                {item.imageUri ? (
                    <Image source={{ uri: item.imageUri }} style={styles.thumb} />
                ) : (
                    <User color={"#fff"} size={60} />
                )}
            </View>
            <View style={styles.itemTextContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.nome}
                </Text>
                <Text>{item.createdAt}</Text>
                <Text>
                    {item.latitude !== null && item.longitude !== null
                        ? `${item.latitude.toFixed(5)}, ${item.longitude.toFixed(5)}`
                        : "Sem coordenadas"}
                </Text>
                <Text>
                    {item.totalG !== null
                        ? `${item.totalG.toFixed(2)}g${item.exceeded2g ? " (acima de 2g!)" : ""}`
                        : "Sem leitura do sensor"}
                </Text>
                <Pressable style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                    <Trash2 size={16} color="#e5484d" />
                    <Text style={styles.deleteText}>Excluir</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <ContentBody>
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4d4c4c", marginBottom: 10 }}>
                    {showHistory ? "Histórico" : "Formulário"}
                </Text>

                {showHistory ? (
                    <>
                        <FlatList
                            data={history}
                            keyExtractor={(item) => item.id}
                            renderItem={renderHistoryItem}
                            style={styles.list}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text>Nenhum formulário salvo</Text>}
                        />
                        {history.length > 0 && (
                            <Pressable style={styles.btnSecondary} onPress={clearAll}>
                                <Trash2 size={20} color="#4d4c4c" />
                                <Text style={styles.btnSecondaryText}>Limpar tudo</Text>
                            </Pressable>
                        )}
                        <Pressable style={styles.btnPrimary} onPress={() => setShowHistory(false)}>
                            <Send size={20} color="#fff" />
                            <Text style={styles.btnPrimaryText}>Voltar ao formulário</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent}>
                            <View style={styles.itemContainer}>
                                <View style={styles.itemPfpContainer}>
                                    <User color={"#fff"} size={60} />
                                </View>
                                <View style={styles.itemTextContainer}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                        Nome da pessoa
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Digite o nome..."
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>
                            </View>

                            <View style={styles.itemContainer}>
                                <View style={[styles.itemPfpContainer, { backgroundColor: "#b68ad3" }]}>
                                    <Camera color={"#fff"} size={60} />
                                </View>
                                <View style={styles.itemTextContainer}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                        Foto
                                    </Text>
                                    <Text>Tire uma foto ou escolha da galeria.</Text>
                                    <View style={styles.buttonRow}>
                                        <Pressable style={styles.smallButton} onPress={takePhoto}>
                                            <Camera size={16} color="#4d4c4c" />
                                            <Text style={styles.smallButtonText}>Foto</Text>
                                        </Pressable>
                                        <Pressable style={styles.smallButton} onPress={selectImage}>
                                            <ImageIcon size={16} color="#4d4c4c" />
                                            <Text style={styles.smallButtonText}>Galeria</Text>
                                        </Pressable>
                                    </View>
                                    {imageUri ? (
                                        <Image source={{ uri: imageUri }} style={styles.image} />
                                    ) : (
                                        <Text style={{ marginTop: 8 }}>Nenhuma imagem selecionada</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.itemContainer}>
                                <View style={[styles.itemPfpContainer, { backgroundColor: "#92ca63" }]}>
                                    <MapPin color={"#fff"} size={60} />
                                </View>
                                <View style={styles.itemTextContainer}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                        Coordenadas
                                    </Text>
                                    <Text>Lat: {latitude ?? "Carregando..."}</Text>
                                    <Text>Long: {longitude ?? "Carregando..."}</Text>
                                    <Pressable style={styles.refreshButton} onPress={loadLocation}>
                                        <Text style={styles.refreshText}>Atualizar localização</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={styles.itemContainer}>
                                <View style={[styles.itemPfpContainer, { backgroundColor: "#e0bc58" }]}>
                                    <Vibrate color={"#fff"} size={60} />
                                </View>
                                <View style={styles.itemTextContainer}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                        Acelerômetro
                                    </Text>
                                    <Text>
                                        {accel ? `x: ${accel.x.toFixed(2)}  y: ${accel.y.toFixed(2)}  z: ${accel.z.toFixed(2)}` : "Carregando..."}
                                    </Text>
                                    <Text>
                                        {totalG !== null ? `Força atual: ${totalG.toFixed(2)}g` : ""}
                                    </Text>
                                    {totalG !== null && (exceeded ? (
                                        <View style={styles.alertBadge}>
                                            <Text style={styles.alertText}>Acima de 2g!</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.okBadge}>
                                            <Text style={styles.okText}>Abaixo de 2g</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        <Pressable style={styles.btnPrimary} onPress={handleSubmit}>
                            <Send size={20} color="#fff" />
                            <Text style={styles.btnPrimaryText}>Enviar</Text>
                        </Pressable>

                        <Pressable style={styles.btnSecondary} onPress={() => setShowHistory(true)}>
                            <History size={20} color="#4d4c4c" />
                            <Text style={styles.btnSecondaryText}>Histórico ({history.length})</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </ContentBody>
    );
};

export default FormScreen;

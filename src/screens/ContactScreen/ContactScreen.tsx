import { Text, View, Alert, FlatList, TextInput } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { Contact, ContactField, requestPermissionsAsync } from "expo-contacts";
import { useEffect, useState } from "react";
import { Contact as ContactIcon, Mail, Phone } from "lucide-react-native";

type ContactData = Awaited<ReturnType<typeof Contact.getAllDetails>>[number];

const getDisplayName = (item: ContactData) => {
    return (item as any).fullName || `${(item as any).givenName ?? ""} ${(item as any).familyName ?? ""}`.trim() || "Sem nome";
};


const ContactScreen = () => {
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    const loadContacts = async () => {
        const { status } = await requestPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissão Negada", "Permissão para acessar contatos foi negada.");
            return;
        }
    
        try {
            const data = await Contact.getAllDetails(
                [ContactField.GIVEN_NAME, ContactField.FAMILY_NAME, ContactField.FULL_NAME, ContactField.PHONES, ContactField.EMAILS]
            );

            if (data.length > 0) {
                setContacts(data as ContactData[]);
            } else {
                Alert.alert("Sem Contatos", "Nenhum Contato encontrado.");
            }
        } catch (err) {
            Alert.alert("Erro", "Ocorreu um erro ao carregar os contatos.");
            console.log(err);
        }
    }

    const filtered = contacts.filter((item) =>
        getDisplayName(item).toLowerCase().includes(search.toLowerCase())
    );

    const visible = filtered.slice(0, visibleCount);

    const renderItem = ({ item }: { item: ContactData }) => {
        const displayName = getDisplayName(item);
        const phones = (item as any).phones as { id: string; number?: string; label?: string }[] | undefined;
        const emails = (item as any).emails as { id: string; address?: string; label?: string }[] | undefined;

        return (
            <View style={ styles.itemContainer }>
                <View style={ styles.itemPfpContainer }>
                    <ContactIcon color={"#fff"} size={60} />
                </View>
                <View style={ styles.itemTextContainer }>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {displayName}
                    </Text>

                    {phones && phones.map((phone, index) => (
                        <Text key={phone.id ?? String(index)}>
                            <Phone /> {phone.number}
                        </Text>
                    ))}

                    {emails && emails.map((email, index) => (
                        <Text key={email.id ?? String(index)}>
                            <Mail /> {email.address}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return(
        <ContentBody>
            <View style={ styles.container }>
                <Text style={{ fontSize: 25, fontWeight:"bold", color: "#4d4c4c", marginBottom: 10 }}>
                    Contatos
                </Text>

                <TextInput
                    style={ styles.searchInput }
                    placeholder="Buscar por nome..."
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                        setVisibleCount(10);
                    }}
                />

                <FlatList
                    data={visible}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    style={ styles.list }
                    contentContainerStyle={ styles.listContent }
                    onEndReached={() => {
                        if (visibleCount < filtered.length) {
                            setVisibleCount((prev) => prev + 10);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </ContentBody>
    );
}

export default ContactScreen;

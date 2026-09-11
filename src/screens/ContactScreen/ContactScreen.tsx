import { Pressable, Text, View, Alert, FlatList } from "react-native";
import ContentBody from "../../components/ContentBody/ContentBody";
import { styles } from "./styles";
import { Contact, ContactField, requestPermissionsAsync } from "expo-contacts";
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react-native";

type ContactData = Awaited<ReturnType<typeof Contact.getAllDetails>>[number];

const ContactScreen = () => {
    const [contacts, setContacts] = useState<ContactData[]>();

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

    const renderItem = ({ item }: { item: ContactData }) => {
        const displayName = (item as any).fullName || `${(item as any).givenName ?? ""} ${(item as any).familyName ?? ""}`.trim() || "Sem nome";
        const phones = (item as any).phones as { id: string; number?: string; label?: string }[] | undefined;
        const emails = (item as any).emails as { id: string; address?: string; label?: string }[] | undefined;

        return (
            <View style={ "" }>
                <Text style={ "" }>
                    {displayName}
                </Text>

                {phones && phones.map((phone, index) => (
                    <Text key={phone.id ?? String(index)} style={ "" }>
                        <Phone /> {phone.number}
                    </Text>
                ))}

                {emails && emails.map((email, index) => (
                    <Text key={email.id ?? String(index)} style={ "" }>
                        <Mail /> {email.address}
                    </Text>
                ))}
            </View>
        );
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return(
        <ContentBody>
            <View style={ styles.container }>
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={""}
                />
            </View>
        </ContentBody>
    );
}

export default ContactScreen;
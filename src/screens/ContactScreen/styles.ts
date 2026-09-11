import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center", 
        gap: 20
    },

    itemContainer: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        borderColor: "#d4d4d4",
        display: "flex",
        flexDirection: "row"
    },

    itemPfpContainer: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#6fa0b6",
    },

    itemTextContainer: {
        flex: 1,
        padding: 5,
        display: "flex",
        textAlign:"justify"
    },

    searchInput: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 10
    },

    list: {
        flex: 1,
        width: "100%"
    },

    listContent: {
        gap: 20,
        paddingBottom: 20
    }
});
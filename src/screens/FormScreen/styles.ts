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
        textAlign: "justify"
    },

    input: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 10,
        marginTop: 8
    },

    buttonRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8
    },

    smallButton: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 6
    },

    smallButtonText: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#4d4c4c"
    },

    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        marginTop: 8
    },

    refreshButton: {
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 8,
        alignItems: "center"
    },

    refreshText: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#4d4c4c"
    },

    alertBadge: {
        marginTop: 8,
        backgroundColor: "#e5484d",
        borderRadius: 8,
        padding: 8,
        alignItems: "center"
    },

    alertText: {
        color: "#fff",
        fontWeight: "bold"
    },

    okBadge: {
        marginTop: 8,
        backgroundColor: "#e8f5e0",
        borderRadius: 8,
        padding: 8,
        alignItems: "center"
    },

    okText: {
        color: "#3a7d2c",
        fontWeight: "bold"
    },

    btnPrimary: {
        width: "100%",
        backgroundColor: "#e27831",
        borderRadius: 10,
        padding: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8
    },

    btnPrimaryText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },

    btnSecondary: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8
    },

    btnSecondaryText: {
        color: "#4d4c4c",
        fontWeight: "bold",
        fontSize: 16
    },

    formScroll: {
        flex: 1,
        width: "100%"
    },

    formContent: {
        gap: 20,
        paddingBottom: 20
    },

    list: {
        flex: 1,
        width: "100%"
    },

    listContent: {
        gap: 20,
        paddingBottom: 20
    },

    thumb: {
        width: 70,
        height: 70,
        borderRadius: 5
    },

    deleteButton: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    deleteText: {
        color: "#e5484d",
        fontWeight: "bold"
    }
});

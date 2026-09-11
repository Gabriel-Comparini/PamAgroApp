import { View } from "react-native";
import { styles } from "./styles";

const ContentBody = ({ children } : { children: any }) => {
    return(
        <View style={styles.container}>
            {children}
        </View>
    );
}

export default ContentBody;
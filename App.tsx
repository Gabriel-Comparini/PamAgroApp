import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/screens/MainMenu/MainMenu";
import ContactScreen from "./src/screens/ContactScreen/ContactScreen";
import LocationScreen from "./src/screens/LocationScreen/LocationScreen";
import GalleryScreen from "./src/screens/GalleryScreen/GalleryScreen";
import FormScreen from "./src/screens/FormScreen/FormScreen";


const RS = createNativeStackNavigator({
    screens: {
        MainMenu: {
            screen: MainMenu
        },

        ContactScreen: {
            screen: ContactScreen
        },

        LocationScreen: {
            screen: LocationScreen
        },

        GalleryScreen: {
            screen: GalleryScreen
        },

        FormScreen: {
            screen: FormScreen
        }
    },
    screenOptions: {
        headerShown: false,
        animation: "slide_from_left"
    }
});

const Content = createStaticNavigation(RS);

const App = () => {
    return <Content />
}

export default App;
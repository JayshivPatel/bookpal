import * as React from "react";
import {
    BottomNavigation,
    PaperProvider,
    MD3DarkTheme,
} from "react-native-paper";
import { StatusBar } from 'expo-status-bar';

import { createDatabase } from "./src/api/database";
import Lookup from "./src/pages/Lookup";
import Words from "./src/pages/Words";

const LookupScreen = () => <Lookup />;
const WordsScreen = () => <Words />;

export default function App() {
    // Database
    createDatabase();

    // Navigator
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        {
            key: "words",
            title: "Words",
            focusedIcon: "file-word-box",
            unfocusedIcon: "file-word-box-outline",
        },
        {
            key: "search",
            title: "Search",
            focusedIcon: "book-search",
            unfocusedIcon: "book-search-outline",
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        words: WordsScreen,
        search: LookupScreen,
    });

    return (
        <PaperProvider theme={MD3DarkTheme}>
            <StatusBar style="light" />
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                style={{ flex: 1 }}
            />
        </PaperProvider>
    );
}

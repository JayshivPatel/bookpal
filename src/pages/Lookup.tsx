import * as React from "react";
import { Appbar, TextInput, Text, Card } from "react-native-paper";
import {
    DictionaryResponse,
    ErrorResponse,
    fetchWordDefinitions,
} from "../api/dictionary";
import { displayDictionaryResponse } from "../util/displayDictionaryResponse";
import { ScrollView, View } from "react-native";

const Landing = () => {
    const [inputText, setInputText] = React.useState("");
    const outputTextFiller = "Definitions will appear here!";
    const fillerObj = (
        <Card style={{ marginBottom: 10, padding: 16, alignItems: "center" }}>
            <Text variant="bodyLarge">{outputTextFiller}</Text>
        </Card>
    );
    const [outputItems, setOutputItems] =
        React.useState<React.ReactNode>(fillerObj);

    const inputHandler = async (word: string) => {
        // Fill the input field.
        setInputText(word);

        // Reset on empty field.
        if (word.length === 0) {
            setOutputItems(fillerObj);
            return;
        }

        // Query API.
        const response: DictionaryResponse[] | ErrorResponse =
            await fetchWordDefinitions(word);
        setOutputItems(displayDictionaryResponse(response));
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Lookup" />
                </Appbar.Header>
            </View>
            <View>
                <Card style={{ marginBottom: 10 }}>
                    <Card.Content>
                        <TextInput
                            label="Search for a word"
                            value={inputText}
                            onChangeText={inputHandler}
                            mode={"outlined"}
                        />
                    </Card.Content>
                </Card>
            </View>
            <ScrollView style={{ flex: 1 }}>{outputItems}</ScrollView>
        </View>
    );
};

export default Landing;

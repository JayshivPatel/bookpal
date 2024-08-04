import * as React from "react";
import { TextInput, Text, Card } from "react-native-paper";
import {
    DictionaryResponse,
    ErrorResponse,
    fetchWordDefinitions,
} from "../api/dictionary";
import { displayDictionaryResponse } from "../util/displayDictionaryResponse";
import { ScrollView, View } from "react-native";

const Landing = () => {
    const [inputText, setInputText] = React.useState("");
    const outputTextFiller = "Enter a word to look up its meaning!";
    const [outputItems, setOutputItems] = React.useState<React.ReactNode>(
        <Card style={{ margin: 16, padding: 16, alignItems: "center" }}>
            <Text variant="bodyLarge">{outputTextFiller}</Text>
        </Card>
    );

    const inputHandler = async (word: string) => {
        // Fill the input field.
        setInputText(word);

        // Reset on empty field.
        if (word.length === 0) {
            setOutputItems(<Text>{outputTextFiller}</Text>);
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
                <TextInput
                    label="Type a word"
                    value={inputText}
                    onChangeText={inputHandler}
                    mode={"outlined"}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>{outputItems}</ScrollView>
        </View>
    );
};

export default Landing;

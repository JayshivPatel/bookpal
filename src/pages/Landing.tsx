import * as React from 'react';
import { TextInput, Card, Appbar, Text } from 'react-native-paper';
import { DictionaryResponse, ErrorResponse, fetchWordDefinitions } from '../dictionary';
import { extractItems } from './util/extractItems';
import { ScrollView, View } from 'react-native';


const Landing = () => {
    const [inputText, setInputText] = React.useState("");
    const outputTextFiller = "Enter a word to look up its meaning!";
    const [outputItems, setOutputItems] = React.useState<React.ReactNode>(<Text>{outputTextFiller}</Text>);

    const inputHandler = async (word: string) => {
        // Fill the input field.
        setInputText(word);

        // Reset on empty field.
        if (word.length === 0) {
            setOutputItems(<Text>{outputTextFiller}</Text>);
            return;
        }

        // Query API.
        const response: DictionaryResponse[] | ErrorResponse = await fetchWordDefinitions(word);
        setOutputItems(extractItems(response));
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="BookPal" />
            </Appbar.Header>

            <Card>
                <Card.Content>
                    <TextInput
                        label="Type a word"
                        value={inputText}
                        onChangeText={inputHandler}
                        mode={"outlined"}
                    />
                </Card.Content>
            </Card>

            <ScrollView>
                <Card>
                    <Card.Title title="Results:" />
                    <Card.Content>
                        {outputItems}
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

export default Landing;

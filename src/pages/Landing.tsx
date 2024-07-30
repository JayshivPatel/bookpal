import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { DictionaryResponse, ErrorResponse, fetchWordDefinitions } from '../dictionary';
import { displayDictionaryResponse } from './components/displayDictionaryResponse';
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
        setOutputItems(displayDictionaryResponse(response));
    }

    return (
        <View style={{flex: 1}}>
                <TextInput
                    label="Type a word"
                    value={inputText}
                    onChangeText={inputHandler}
                    mode={"outlined"}
                />
            <ScrollView>
                {outputItems}
            </ScrollView>
        </View>
    );
};

export default Landing;

import * as React from 'react';
import { TextInput, Card, Appbar, Text} from 'react-native-paper';
import { DictionaryResponse, ErrorResponse, fetchWordDefinitions, extractText } from '../dictionary';
import { ScrollView, View } from 'react-native';

const Landing = () => {
    const [inputText, setInputText] = React.useState("");
    const outputTextFiller = "Enter a word to look up its meaning!";
    const [outputText, setOutputText] = React.useState(outputTextFiller);

    const inputHandler = async (word: string) => {
        // Fill the input field.
        setInputText(word);

        // Reset on empty field.
        if (word.length == 0) {
            setOutputText(outputTextFiller);
            return
        }

        // Query API.
        const response: DictionaryResponse[] | ErrorResponse = await fetchWordDefinitions(word);
        setOutputText(extractText(response));
    }

    return (
            <View>

                <Appbar.Header>
                    <Appbar.Content title="BookPal" />
                </Appbar.Header>

                <Card>
                    <Card.Title title="Enter a word:" /> 
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
                            <Text>{outputText}</Text>
                        </Card.Content>
                    </Card>
                </ScrollView>

            </View>
    );
};



export default Landing;
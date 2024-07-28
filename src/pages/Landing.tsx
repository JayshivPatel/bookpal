import * as React from 'react';
import { TextInput, Card, Appbar, Text} from 'react-native-paper';
import { DictionaryResponse, Meaning, Definition, getDefinition } from '../dictionary'

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
        const response: DictionaryResponse[] = await getDefinition(word);
        const firstMeaning: Meaning = response[0].meanings[0];
        const definition: Definition = firstMeaning.definitions[0];
        setOutputText(definition.definition);
    }

    return (
            <Card>

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

                <Card>
                    <Card.Title title="Results:" />

                    <Card.Content>
                        <Text>{outputText}</Text>
                    </Card.Content>
                </Card>

            </Card>
    );
};



export default Landing;
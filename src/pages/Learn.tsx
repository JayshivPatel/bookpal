import * as React from "react";
import { View } from "react-native";
import { Button, Card, Appbar, Text } from "react-native-paper";
import { getRandomWord } from "../api/database";
import { Word } from "../util/Word";
import { Definition } from "../api/dictionary";

const Learn = () => {
    const [showDefinition, setShowDefinition] = React.useState(false);
    const wordFiller: Word = {
        id: null,
        book: null,
        word: "Couldn't load Words!",
        definition: null,
        timeAdded: null,
    };
    const [word, setWord] = React.useState(wordFiller);
    const definitionFiller: Definition = {
        definition: "Couldn't load definition!",
        example: null,
        synonyms: null,
        antonyms: null,
    };
    const [definition, setDefinition] = React.useState(definitionFiller);
    const toggleDefinitionVisibility = () => {
        setShowDefinition(!showDefinition);
    };

    const fetchWord = async () => {
        const word: Word = await getRandomWord();
        setWord(word);
        setDefinition(JSON.parse(word.definition));
    };

    const getNextWord = () => {
        fetchWord();
        setShowDefinition(false);
    };

    React.useEffect(() => {
        fetchWord();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ marginBottom: 10 }}>
                <Card.Title title="Learn" titleVariant="titleMedium" />
                <Card.Content>
                    <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
                        {word.word}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={toggleDefinitionVisibility}
                    >
                        {showDefinition ? "Hide" : "Show"}
                    </Button>
                </Card.Actions>
            </Card>

            {showDefinition && (
                <Card>
                    <Card.Content>
                        <Text variant="bodyMedium">
                            {definition.definition}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={getNextWord}>
                            {"Next"}
                        </Button>
                    </Card.Actions>
                </Card>
            )}
        </View>
    );
};

export default Learn;

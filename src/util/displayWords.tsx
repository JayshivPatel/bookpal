import * as React from "react";
import { Word } from "./Word";
import { Card, Text } from "react-native-paper";
import { Definition } from "../api/dictionary";
import { DatabaseDefinitionCard } from "../components/DatabaseDefinitionCard";

export function displayWords(words: Word[]): React.ReactNode {
    if (words.length == 0) {
        return (
            <Card style={{ alignItems: "center" }}>
                <Card.Content>
                    <Text variant="bodyLarge">
                        Couldn't find any words in the database.
                    </Text>

                    <Text variant="bodySmall">
                        Try using the Search screen and saving some!
                    </Text>
                </Card.Content>
            </Card>
        );
    }

    const items = [];

    words.forEach((word) => {
        const definition: Definition = JSON.parse(word.definition);

        items.push(
            <DatabaseDefinitionCard
                key={`def-${definition.definition}-word-${word.id}`}
                word={word.word}
                definition={definition.definition}
                example={definition.example}
                synonyms={definition.synonyms || []}
                antonyms={definition.antonyms || []}
            />
        );
    });

    return items;
}

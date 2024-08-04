import * as React from "react";
import { Word } from "./Word";
import { Text } from "react-native-paper";
import { Definition } from "../api/dictionary";
import { DatabaseDefinitionCard } from "../components/DatabaseDefinitionCard";

export function displayWords(words: Word[]): React.ReactNode {
    if (words.length == 0) {
        return (<Text>No words in the database!</Text>)
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

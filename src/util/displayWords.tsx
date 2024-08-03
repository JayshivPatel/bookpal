import * as React from 'react';
import { List, Divider, Text} from 'react-native-paper';
import { DefinitionCard } from '../components/DefinitionCard';
import { Word } from './Word';
import { Definition } from '../api/dictionary';

export function displayWords(words: Word[]): React.ReactNode {
    const items = [];

    words.forEach((word) => {
        items.push(
        <List.Subheader 
            key={`pos-${word.definition}`}
        >
            <Text variant='titleLarge'>{word.word}</Text>
        </List.Subheader>);

        const definition: Definition = JSON.parse(word.definition);

        items.push(
        <DefinitionCard
            key={`def-${definition.definition}`}
            word={word.word}
            book={"MyFixedBook"}
            definition={definition.definition}
            example={definition.example}
            synonyms={definition.synonyms || []}
            antonyms={definition.antonyms || []}
        />
        );

        items.push(<Divider key={`divider-${definition.definition}`} />);
        });

    return items;
}

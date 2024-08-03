import * as React from 'react';
import { List, Divider, Text} from 'react-native-paper';
import { Word } from './Word';
import { Definition } from '../api/dictionary';
import { DatabaseDefinitionCard } from '../components/DatabaseDefinitionCard';

export function displayWords(words: Word[]): React.ReactNode {
    const items = [];

    words.forEach((word) => {
        items.push(
        <List.Subheader 
            key={`pos-${word.definition}-word-${word.id}`}
        >
            <Text variant='titleLarge'>{word.word}</Text>
        </List.Subheader>);

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

        items.push(<Divider key={`divider-${definition.definition}-word-${word.id}`} />);
        });

    return items;
}

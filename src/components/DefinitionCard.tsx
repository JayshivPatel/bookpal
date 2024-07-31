import * as React from 'react';
import { Card,  Text } from 'react-native-paper';
import { SynonymChips } from './SynonymChips'

export const DefinitionCard = ({definition, example, synonyms, antonyms}) => (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content>
        <Text variant="labelLarge">{definition}</Text>
        {example && <Text>{`"${example}"`}</Text>}
        {synonyms.length > 0 && <SynonymChips label="Synonyms" items={synonyms} />}
        {antonyms.length > 0 && <SynonymChips label="Antonyms" items={antonyms} />}
      </Card.Content>
    </Card>
);
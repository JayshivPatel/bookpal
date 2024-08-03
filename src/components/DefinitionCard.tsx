import * as React from 'react';
import { Text } from 'react-native-paper';
import { SynonymChips } from './SynonymChips'
import { View } from 'react-native';

export const DefinitionCard = ({definition, example, synonyms, antonyms}) => {
  
    return (
      <View style={{ flex: 1 }}>
        <Text variant="labelLarge">{definition}</Text>
        {example && <Text>{`"${example}"`}</Text>}
        {synonyms.length > 0 && <SynonymChips label="Synonyms" items={synonyms} />}
        {antonyms.length > 0 && <SynonymChips label="Antonyms" items={antonyms} />}
      </View>
    );
}
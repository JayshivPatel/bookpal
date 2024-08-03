import * as React from 'react';
import { Card,  IconButton,  Text } from 'react-native-paper';
import { SynonymChips } from './SynonymChips'
import { View } from 'react-native';

import { removeWordFromDatabase } from '../api/database';
import { Definition } from '../api/dictionary';

export const DatabaseDefinitionCard = ({word, definition, example, synonyms, antonyms}) => {

    const handleToggle = () => {
        const databaseDefinition: Definition = {
            definition: definition,
            example: example,
            synonyms: synonyms,
            antonyms: antonyms
        }
        
        removeWordFromDatabase(word, databaseDefinition);
    }

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ marginBottom: 10, flex: 1 }}>
                <Card.Content>
                    <View style={{ flexDirection:"row", flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text variant="labelLarge">{definition}</Text>
                            {example && <Text>{`"${example}"`}</Text>}
                            {synonyms.length > 0 && <SynonymChips label="Synonyms" items={synonyms} />}
                            {antonyms.length > 0 && <SynonymChips label="Antonyms" items={antonyms} />}
                        </View>
                        <View>
                            <IconButton
                            icon={'close-circle'}
                            size={20}
                            onPress={handleToggle}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}
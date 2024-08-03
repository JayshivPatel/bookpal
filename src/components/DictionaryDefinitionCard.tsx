import * as React from 'react';
import { Card,  IconButton } from 'react-native-paper';
import { View } from 'react-native';

import { addWordToDatabase, checkWordInDatabase, removeWordFromDatabase } from '../api/database';
import { Definition } from '../api/dictionary';
import { DefinitionCard } from './DefinitionCard';

export const DictionaryDefinitionCard = ({word, book, definition, example, synonyms, antonyms}) => {
    const databaseDefinition: Definition = {
        definition: definition,
        example: example,
        synonyms: synonyms,
        antonyms: antonyms
    };

    const alreadyInDatabase = () => {
        const inDatabase: Promise<boolean> = checkWordInDatabase(word, databaseDefinition);
        inDatabase.then((wordInDatabase) => {setIsToggled(wordInDatabase);})
    }

    const [isToggled, setIsToggled] = React.useState(false);

    alreadyInDatabase();

    const handleToggle = () => {
        setIsToggled(!isToggled);
        if (!isToggled) {
            addWordToDatabase(word, book, databaseDefinition);
        } else {
            removeWordFromDatabase(word, databaseDefinition);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ marginBottom: 10, flex: 1 }}>
                <Card.Content>
                    <View style={{ flexDirection:"row", flex: 1 }}>
                        <DefinitionCard 
                            definition={definition}
                            example={example}
                            synonyms={synonyms}
                            antonyms={antonyms}
                        />
                        <View>
                            <IconButton
                            icon={isToggled ? 'bookmark' : 'bookmark-outline'}
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
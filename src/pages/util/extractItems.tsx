import * as React from 'react';
import { Card, List, Divider, Chip, IconButton, Text } from 'react-native-paper';
import { DictionaryResponse, ErrorResponse, isErrorResponse } from '../../dictionary';
import { View } from 'react-native';

export function extractItems(response: DictionaryResponse[] | ErrorResponse): React.ReactNode {
    if (isErrorResponse(response)) {
        return (
            <List.Item
                title={`${response.title}`}
                description={`${response.resolution}`}
            />
        );
    } else {
        const items: React.ReactNode[] = [];
        let itemId = 0; // Counter for unique keys

        for (const dictResponse of response) {
            for (const meaning of dictResponse.meanings) {
                const definitions = meaning.definitions.slice(0, 2); // Top 2 definitions
                items.push(
                    <List.Subheader key={`pos-${itemId}`}>
                        {meaning.partOfSpeech}
                    </List.Subheader>
                );

                for (const definition of definitions) {
                    items.push(
                        <Card key={`def-${itemId}`} style={{ marginBottom: 10 }}>
                            <Card.Content>
                                <Text variant="labelLarge">{definition.definition}</Text>

                                {definition.example && (
                                    <Text>{`"${definition.example}"`}</Text>
                                )}
                                {definition.synonyms && definition.synonyms.length > 0 && (
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
                                        {definition.synonyms.map((synonym, index) => (
                                            <Chip key={`def-syn-${itemId}-${index}`} style={{ margin: 2 }}>
                                                {synonym}
                                            </Chip>
                                        ))}
                                    </View>
                                )}
                                {definition.antonyms && definition.antonyms.length > 0 && (
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
                                        {definition.antonyms.map((antonym, index) => (
                                            <Chip key={`def-ant-${itemId}-${index}`} style={{ margin: 2 }}>
                                                {antonym}
                                            </Chip>
                                        ))}
                                    </View>
                                )}
                            </Card.Content>
                        </Card>
                    );
                    itemId++;
                }

                // Display meaning-level synonyms and antonyms
                if (meaning.synonyms && meaning.synonyms.length > 0) {
                    items.push(
                        <View key={`meaning-synonyms-${itemId}`} style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
                            {meaning.synonyms.map((synonym, index) => (
                                <Chip key={`meaning-syn-${itemId}-${index}`} style={{ margin: 2 }}>
                                    {synonym}
                                </Chip>
                            ))}
                        </View>
                    );
                }
                if (meaning.antonyms && meaning.antonyms.length > 0) {
                    items.push(
                        <View key={`meaning-antonyms-${itemId}`} style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
                            {meaning.antonyms.map((antonym, index) => (
                                <Chip key={`meaning-ant-${itemId}-${index}`} style={{ margin: 2 }}>
                                    {antonym}
                                </Chip>
                            ))}
                        </View>
                    );
                }


                items.push(<Divider key={`divider-${itemId}`} />);
            }
        }
        return items;
    }
}
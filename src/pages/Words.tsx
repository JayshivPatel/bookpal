import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, List } from 'react-native-paper';
import { getAllWords } from '../api/database';
import { Word } from '../util/Word'
import { DefinitionCard } from '../components/DefinitionCard';
import { Definition } from '../api/dictionary';

const Words = () => {
    const [wordList, setWordList] = React.useState<Word[]>([]);

    React.useEffect(() => {
        const fetchWords = async () => {
            try {
                const words: Word[] = await getAllWords();
                setWordList(words);
            } catch (error) {
                throw new Error(error);
            }
        };

        fetchWords();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {wordList.map((wordRecord: Word) => {
                    const definition: Definition = JSON.parse(wordRecord.definition);

                    return (
                        <View>
                            <List.Subheader>
                                <Text variant='labelLarge'>{wordRecord.word}</Text>
                            </List.Subheader>
                            <DefinitionCard
                                key={`disp-${wordRecord.id}`}
                                word={wordRecord.word}
                                book="MyFixedBook"
                                definition={definition.definition}
                                example={definition.example}
                                synonyms={definition.synonyms || []}
                                antonyms={definition.antonyms || []}
                            />
                        </View>
                    );
                })}

            </ScrollView>
        </View>
    );
    
};


export default Words;
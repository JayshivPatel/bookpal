import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getAllWords } from '../api/database';
import { Word } from '../util/Word'
import { DefinitionCard } from '../components/DefinitionCard';

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
        <View style={{flex: 1}}>
            <ScrollView>
            {wordList.map((word) => (
                <View>
                    <DefinitionCard
                        definition={word.definition.definition}
                        example={word.definition.example}
                        synonyms={word.definition.synonyms || []}
                        antonyms={word.definition.antonyms || []}
                    />
                </View>
            ))}
            </ScrollView>
        </View>
    );
};


export default Words;
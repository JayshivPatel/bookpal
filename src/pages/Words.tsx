import * as React from 'react';
import { ScrollView, View } from 'react-native';
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
            {wordList.map((wordRecord) => (
                <View>
                    <DefinitionCard
                        key={`disp-${wordRecord.id}`}
                        word={wordRecord.word}
                        book={"MyFixedBook"}
                        definition={wordRecord.definition.definition}
                        example={wordRecord.definition.example}
                        synonyms={wordRecord.definition.synonyms || []}
                        antonyms={wordRecord.definition.antonyms || []}
                    />
                </View>
            ))}
            </ScrollView>
        </View>
    );
};


export default Words;
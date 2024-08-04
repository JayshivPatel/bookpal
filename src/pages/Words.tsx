import * as React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { getAllWords } from "../api/database";
import { displayWords } from "../util/displayWords";

const Words = () => {
    const wordsFiller = "Couldn't read words from the database!";
    const [words, setWords] = React.useState<React.ReactNode>(
        <Text>{wordsFiller}</Text>
    );
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchWords();
        setRefreshing(false);
    }, []);

    const fetchWords = async () => {
        const wordsList = await getAllWords();
        setWords(displayWords(wordsList));
    };

    fetchWords();

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ marginTop: 10, marginBottom: 10 }}>
                <Card.Title title="Words" titleVariant="titleMedium" />
            </Card>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {words}
            </ScrollView>
        </View>
    );
};

export default Words;

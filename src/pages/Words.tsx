import * as React from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";
import { getAllWords } from "../api/database";
import { displayWords } from "../util/displayWords";

const Words = () => {
    const fillerObj = (
        <Card style={{ marginBottom: 10, padding: 16, alignItems: "center" }}>
            <Text variant="bodyLarge">
                No saved definitions! Go to Search to save some!
            </Text>
        </Card>
    );

    const [words, setWords] = React.useState<React.ReactNode>(fillerObj);

    const fetchWords = async () => {
        const wordsList = await getAllWords();
        setWords(displayWords(wordsList));
    };

    fetchWords();

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Words" />
                </Appbar.Header>
            </View>
            <ScrollView>{words}</ScrollView>
        </View>
    );
};

export default Words;

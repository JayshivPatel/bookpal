import * as React from "react";
import { Card, IconButton } from "react-native-paper";
import { View } from "react-native";

import { removeWordFromDatabase } from "../api/database";
import { Definition } from "../api/dictionary";
import { DefinitionCard } from "./DefinitionCard";

export const DatabaseDefinitionCard = ({
    word,
    definition,
    example,
    synonyms,
    antonyms,
}) => {
    const handleToggle = () => {
        const databaseDefinition: Definition = {
            definition: definition,
            example: example,
            synonyms: synonyms,
            antonyms: antonyms,
        };

        removeWordFromDatabase(word, databaseDefinition);
    };

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ marginBottom: 10, flex: 1 }}>
                <Card.Content>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <DefinitionCard
                            word={word}
                            definition={definition}
                            example={example}
                            synonyms={synonyms}
                            antonyms={antonyms}
                        />
                        <View>
                            <IconButton
                                icon={"close-circle"}
                                size={20}
                                onPress={handleToggle}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

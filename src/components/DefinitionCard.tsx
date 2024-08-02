import * as React from 'react';
import { Button, Card,  IconButton,  Text } from 'react-native-paper';
import { SynonymChips } from './SynonymChips'
import { View } from 'react-native';

export const DefinitionCard = ({definition, example, synonyms, antonyms}) => {
    const [isToggled, setIsToggled] = React.useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
      // Save word to database here.
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
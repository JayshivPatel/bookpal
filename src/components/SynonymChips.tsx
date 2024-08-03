import * as React from 'react';
import { View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

export const SynonymChips = ({label, items, synonym}) => {
  const { colors } = useTheme();

  const chipColor: string = synonym ? colors.primaryContainer : colors.secondaryContainer;
  
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
        {items.map((item, index) => (
          <Chip key={`${label}-${index}`} style={{ margin: 2, backgroundColor: chipColor}}>
            {item}
          </Chip>
        ))}
      </View>
    );
}
import * as React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

export const SynonymChips = ({label, items}) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
      {items.map((item, index) => (
        <Chip key={`${label}-${index}`} style={{ margin: 2 }}>
          {item}
        </Chip>
      ))}
    </View>
);
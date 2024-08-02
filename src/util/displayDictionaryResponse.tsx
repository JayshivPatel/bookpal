import * as React from 'react';
import { List, Divider, Text} from 'react-native-paper';
import { DictionaryResponse, ErrorResponse, isErrorResponse } from '../api/dictionary';
import { DefinitionCard } from '../components/DefinitionCard';
import { SynonymChips } from '../components/SynonymChips';

export function displayDictionaryResponse(response: DictionaryResponse[] | ErrorResponse): React.ReactNode {
  if (isErrorResponse(response)) {
    return <List.Item title={`${response.title}`} description={`${response.resolution}`} />;
  } else {
    const items = [];
    let itemId = 0;

    response.forEach((dictResponse) => {
      dictResponse.meanings.forEach((meaning) => {
        items.push(
        <List.Subheader 
          key={`pos-${itemId}`}
        >
            <Text variant='titleLarge'>{meaning.partOfSpeech}</Text>
        </List.Subheader>);

        meaning.definitions.forEach((definition) => {
          items.push(
            <DefinitionCard
              key={`def-${itemId}`}
              word={dictResponse.word}
              book={"MyFixedBook"}
              definition={definition.definition}
              example={definition.example}
              synonyms={definition.synonyms || []}
              antonyms={definition.antonyms || []}
            />
          );
          itemId++;
        });

        if (meaning.synonyms.length > 0) {
          items.push(<SynonymChips key={`meaning-synonyms-${itemId}`} label="Synonyms" items={meaning.synonyms} />);
        }
        if (meaning.antonyms.length > 0) {
          items.push(<SynonymChips key={`meaning-antonyms-${itemId}`} label="Antonyms" items={meaning.antonyms} />);
        }

        items.push(<Divider key={`divider-${itemId}`} />);
      });
    });
    return items;
  }
}

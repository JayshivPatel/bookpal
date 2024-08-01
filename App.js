import * as React from 'react';
import { BottomNavigation, PaperProvider, Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import { db, createDatabase, addWordToDatabase } from './src/util/database';
import Landing from './src/pages/Landing';
import Book from './src/pages/Book';
import Words from './src/pages/Words';


const LandingScreen = () => <Landing/>
const BookScreen = () => <Book/>
const WordsScreen = () => <Words/>

export default function App() {
  // Navigator
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'words', title: 'Words', focusedIcon: 'file-word-box', unfocusedIcon: 'file-word-box-outline' },
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'book', title: 'Book', focusedIcon: 'book', unfocusedIcon: 'book-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    words: WordsScreen,
    home: LandingScreen,
    book: BookScreen,
  });

  // Database
  useDrizzleStudio(db);
  createDatabase();
  addWordToDatabase("myCoolWord", "myCoolBook", '{"definition":"myCoolDefinition", "example":"", "synonyms":null, "antonyms":null}')

  return (
    <PaperProvider>
        <View>
          <Appbar.Header>
            <Appbar.Content title="BookPal" />
          </Appbar.Header>
        </View>

        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          style={{flex: 1}}
        />

    </PaperProvider>
  );
}
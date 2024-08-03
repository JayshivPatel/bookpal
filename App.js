import * as React from 'react';
import { BottomNavigation, PaperProvider, Appbar, MD3DarkTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import { db, createDatabase } from './src/api/database';
import Landing from './src/pages/Landing';
import Learn from './src/pages/Learn';
import Words from './src/pages/Words';


const LandingScreen = () => <Landing/>
const LearnScreen = () => <Learn/>
const WordsScreen = () => <Words/>

export default function App() {

  // Database
  useDrizzleStudio(db);
  createDatabase();

  // Navigator
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'words', title: 'Words', focusedIcon: 'file-word-box', unfocusedIcon: 'file-word-box-outline' },
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'learn', title: 'Learn', focusedIcon: 'book', unfocusedIcon: 'book-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    words: WordsScreen,
    home: LandingScreen,
    learn: LearnScreen,
  });

  return (
    <PaperProvider theme={MD3DarkTheme}>
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
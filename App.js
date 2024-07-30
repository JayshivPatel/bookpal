import * as React from 'react';
import { BottomNavigation, PaperProvider, Appbar } from 'react-native-paper';
import { View } from 'react-native';

import Landing from './src/pages/Landing';
import Settings from './src/pages/Settings';
import Words from './src/pages/Words';

const LandingScreen = () => <Landing/>
const SettingsScreen = () => <Settings/>
const WordsScreen = () => <Words/>

import { db, createDatabase } from './src/database';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

export default function App() {
  // Navigator
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'words', title: 'Words', focusedIcon: 'file-word-box', unfocusedIcon: 'file-word-box-outline' },
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    words: WordsScreen,
    home: LandingScreen,
    settings: SettingsScreen,
  });

  // Database
  useDrizzleStudio(db);
  createDatabase();

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
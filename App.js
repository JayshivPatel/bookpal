import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, PaperProvider } from 'react-native-paper';

import Landing from "./src/pages/Landing";
import Settings from "./src/pages/Settings";
import Words from "./src/pages/Words";

const LandingScreen = () => <Landing/>
const SettingsScreen = () => <Settings/>
const WordsScreen = () => <Words/>

import { createTable } from './src/database';

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
  createTable();


  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


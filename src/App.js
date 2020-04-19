import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigations/index'

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigation/>
    </SafeAreaProvider>
  );
}

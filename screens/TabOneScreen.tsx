import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Info }from '../components/Info';

export const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <Info />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

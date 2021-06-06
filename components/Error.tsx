import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const ErrorApi = () => {
    return(
        <View style={styles.container}>
            <Text>ERROR!</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        paddingVertical: 10
    },
  });
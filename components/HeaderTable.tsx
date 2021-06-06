import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



export const HeaderTable = () => {
    const data = ['Name', 'Last', 'HighestBid', 'Percent']
    return (
       <View style={styles.row}>
           { data.map((item, index) => 
                <View style={styles.rowItem} key={index}>
                    <Text style={{ fontSize: 16, fontWeight: '600', }}>{item}</Text>
                </View>)
           }
       </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    flex: 0,
    backgroundColor: 'lightskyblue',
    marginTop: 10,
    paddingVertical: 15
  },
  rowItem: {
    width: '25%',
    alignItems: 'center',
  }
});

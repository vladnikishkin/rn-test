import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

import store from '../store'


export const TableItem = observer(({ item, index }) => {

    const fadeAnim = useRef(new Animated.Value(1)).current;
  
    const fade = () => {
      Animated.timing(fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }).start();
    };
  
    useEffect(() => {
      if(store.prevData.length !== 0){
        const temp = store.prevData[index]
        if(temp.id === item.id){
          if(item.last !== temp.last || item.highestBid !== temp.highestBid || item.percentChange !== temp.percentChange){
            fadeAnim.setValue(0.1)
            fade()
          }
        }
      }
    },[ store.data ])
    return(
      <Animated.View
        style={{
          width: '100%',
          flexDirection: 'row',
          opacity: fadeAnim,
        }}
      >
        <View
          style={[
            styles.itemRow,
            styles.itemRowLeft,
            {
              borderTopWidth: index !== 0 ? 0.5 : 1,
              borderBottomWidth: index !== store.data - 1 ? 0.5 : 1,
            }
          ]}
        >
          <Text>{item.name}</Text>
        </View>
        <View
          style={[
            styles.itemRow,
            styles.itemRowCenter,
            {
              borderTopWidth: index !== 0 ? 0.5 : 1,
              borderBottomWidth: index !== store.data - 1 ? 0.5 : 1,
            }
          ]}
        >
          <Text>{item.last}</Text>
        </View>
        <View
          style={[
            styles.itemRow,
            styles.itemRowCenter,
            {
              borderTopWidth: index !== 0 ? 0.5 : 1,
              borderBottomWidth: index !== store.data - 1 ? 0.5 : 1,
            }
          ]}
        >
          <Text>{item.highestBid }</Text>
        </View>
        <View
          style={[
            styles.itemRow,
            styles.itemRowRight,
            {
              borderTopWidth: index !== 0 ? 0.5 : 1,
              borderBottomWidth: index !== store.data - 1 ? 0.5 : 1,
            }
          ]}
        >
          <Text>{item.percentChange}</Text>
        </View>
      </Animated.View>
    )
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    itemRow: {
      width: '25%',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    itemRowLeft: {
      borderLeftWidth: 1,
      borderRightWidth: 0.5,
    },
    itemRowCenter: {
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
    },
    itemRowRight: {
      borderLeftWidth: 0.5,
      borderRightWidth: 1,
    },
  });
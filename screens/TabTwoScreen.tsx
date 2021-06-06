import React, { useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import axios from 'axios';
import { stream$ } from '../stream'
import { HeaderTable } from '../components/HeaderTable';
import { TableItem } from '../components/TableItem';
import store from '../store'
import { ErrorApi } from '../components/Error';

export const TabTwoScreen = observer(() => {
  const isFocused = useIsFocused();
  const sub: any = useRef();

  const getData = async () => {
    await axios.get('https://poloniex.com/public?command=returnTicker')
      .then(({ data }) => {
        const ArrKeys = Object.keys(data)
        let temp: any = []
        ArrKeys.map((item) => {
          temp.push({
            id: data[item].id,
            name: item,
            last: data[item].last,
            highestBid: data[item].highestBid,
            percentChange: data[item].percentChange,
          })
        })
        store.initData(temp)
        store.hundlerLoading(false)
        sub.current = stream$.subscribe(
          (value: any) => store.udpateData(value),
          (error: any) => store.hundlerErr(error),
          () => console.log('Complete'),
        )
      }).catch((e) => {
        store.hundlerErr(true)
        store.hundlerLoading(false)
      })
  }

  useEffect(() => {
    if(isFocused){
      getData()
    }
    else if(!isFocused) {
      sub.current.unsubscribe()
    }
  }, [ isFocused ])

    return (
      <View style={styles.container}>
          <HeaderTable />
          {
            !store.err ? null : 
              <ErrorApi />
          }  
          { 
            store.loading ? 
              <View
                style={{
                  flex: 1,
                  marginTop: 40
                }}
              > 
                <ActivityIndicator 
                  size="small" 
                  color="#000"
                /> 
              </View> : 
              <FlatList
                style={{
                  flex: 1
                }} 
                data={store.data}
                renderItem={({ item, index }) => 
                  <TableItem 
                    item={item} 
                    index={index}
                  />
                }
                keyExtractor={keyExtractor => keyExtractor.id.toString()}
              />
          }
      </View>
    );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

import { Row } from 'native-base';
import React, { Component, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'

const route = ({route}) => {

    const [routeData, setRouteData] = useState([]);
    const [message, setMessage] = useState(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>);
    const [map, setMap] = useState(<></>);

    useEffect(() => {
        (async () => {
            await fetch(`https://babasama.com/get_bus_route?BusNumber=${route.params.BusNumber}&AccountKey=${route.params.AccountKey}`)
            .then((response) => response.json)
            .then((responseJson) => {
                setRouteData(responseJson);
                log(responseJson)
                setMessage(<></>);
            });
        });
    })
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {message}
            {map}
            <FlatList style={{width: '100%'}} data={routeData} renderItem={({item}) => {
                (async () => {
                    let BusStopData;
                    await fetch(`https://babasama.com/get_bus_stop_data?BusStopCode=${item.BusStopCode}&AccountKey=${route.params.AccountKey}`)
                    .then((response) => response.json)
                    .then((responseJson) => BusStopData = responseJson)
                    return <TouchableHighlight onPress={
                        setMap(<MapView style={{width: '100%', height: 200}} region={{
                            latitude: BusStopData.Latitude,
                            longitude: BusStopData.Longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001
                          }}>
                            <Marker coordinate={{
                              latitude: BusStopData.Latitude,
                              longitude: BusStopData.Longitude,
                            }} title={`${BusStopData.Description}`}/>
                          </MapView>)
                    } style={styles.datas}>
                        <Text>{BusStopData.BusStopCode}</Text>
                        <Text>{BusStopData.Description}</Text>
                    </TouchableHighlight>
                })
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    waiting: {
      maxWidth: '100%',
      resizeMode: 'contain'
    }, datas: {
        flexDirection: 'row',
        height: 50,
    }
  });
  

export default route;

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MapView , { Marker }from 'react-native-maps';

const busStop = ({navigation, route}) => {
 
  const [busStopData, setBusStopData] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await fetch(`https://babasama.com/get_busstop_data?code=${route.params.code}&AccountKey=${route.params.AccountKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setBusStopData(responseJson);
          console.log(responseJson);
      }); 
    })();
  }, []);

  let text = "waiting"
  if (busStopData) {
    text = JSON.stringify(busStopData);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView style={{width: '100%', height: 200}} region={{
        latitude: route.params.lat,
        longitude: route.params.long,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }}>
        <Marker coordinate={{
          latitude: route.params.lat,
          longitude: route.params.long
        }} title={"bus stop"}/>
      </MapView>
      <Text>{text}</Text>
    </View>
  );
};

export default busStop; 

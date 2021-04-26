import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

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
      <Text>{text}</Text>
    </View>
  );
};

export default busStop; 

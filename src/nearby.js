import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableHighlight} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import { acc } from 'react-native-reanimated';

Nearby = ({ navigation }) => {
  const [busStopLocation, setBusStopLocation] = useState([]);
  const [message, setMessage] = useState(<Text>Waiting...</Text>);
  const AccountKey = "We/4SNhISV+moxrLY/BVrw=="; 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); 
      setMessage(<Text>Fetching from database...</Text>);

      let data = await fetch(`https://babasama.com/get_nearest_busstop_code?lat=${location.coords.latitude}&long=${location.coords.longitude}&AccountKey=${AccountKey}`)
      .then((response) => response.json())
      .then((responseData) => {
        setBusStopLocation (responseData);
        setMessage(<></>);
      })
      .catch(error => console.warn(error));
    })();
  }, []);
 
  return (
    <View>
      {message}
      <FlatList data={busStopLocation} renderItem={({item}) => (
        <TouchableHighlight style={styles.section} onPress={() => navigation.navigate('Bus Stop'), {code: item.BusStopCode}}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.name}>{item.Description}</Text>
              <Text style={styles.information}>{item.BusStopCode} | {item.RoadName}</Text>
            </View>
            <Ionicons style={styles.icon} name={'chevron-forward'} size={20} />
          </View>
        </TouchableHighlight>
      )}/>
      <Button
        title="Go to Bus Stop"
        onPress={() => navigation.navigate('Bus Stop')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0000002E',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  information: {
    fontSize: 14,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
  },
});

export default Nearby;

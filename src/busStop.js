import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import MapView , { Marker }from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import favData from './favData';

const busStop = ({navigation, route}) => {
 
  const [busStopData, setBusStopData] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await fetch(`https://babasama.com/get_busstop_data?code=${route.params.code}&AccountKey=${route.params.AccountKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setBusStopData(responseJson);
      }); 
    })();
  }, []);

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
      <FlatList data={busStopData} renderItem={({item}) => (
        <View style={styles.flex}>
          <Text style={styles.number}>{item.BusNumber}</Text>
          <FlatList style={styles.data} data={item.BusData} renderItem={({item, index}) => {
            if (item.BusModel === "DD") {
              switch (index) {
                case 0: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
                      </View>
                case 1: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                          <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                          <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
                        </View>
                case 2: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                          <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                          <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
                        </View>
              }
            } else if (item.BusModel === "SD") {
              switch (index) {
                case 0: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
                      </View>
                case 1: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
                      </View>
                case 2: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
                      </View>
              }
            } else if (item.BusModel === "AB") {
              switch (index) {
                case 0: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
                      </View>
                case 1: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
                      </View>
                case 2: 
                  return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                        <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.ArrivalTime} </Text>
                        <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
                      </View>
              }
            }
          }}/>
          <TouchableHighlight style={{marginRight: 90, width: 24}} onPress={() => {
            let newData = {BusNumber: item.BusNumber, BusStopCode: route.params.code};
            favData.push(newData);
            print(favData);
          }}>
            <Ionicons style={styles.icon} name={'heart-outline'} size={24} />
          </TouchableHighlight>
        </View>
      )}/>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  number: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  arrival: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  icon: {
    justifyContent: 'center',
  },
  data: {
    flex: 1.3,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginRight: 30,
  },
  busIcon: {
    width: 50,
    resizeMode: 'contain',
    marginTop: 25
  }
});

export default busStop; 

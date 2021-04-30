import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableHighlight} from 'react-native';
import MapView , { Marker }from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const busStop = ({navigation, route}) => {
 
  const [favList, setFavList] = useState([]);
  const [busStopData, setBusStopData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch(`https://babasama.com/get_busstop_data?code=${route.params.code}&AccountKey=${route.params.AccountKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setBusStopData(responseJson);
      }); 

      try {
        let data = [];
        for (let i = 1; i > 0; i++) {
          let jsonValue = await AsyncStorage.getItem(`${i}`);
          if (jsonValue !== null) {
            data.push(JSON.parse(jsonValue));
          } else {
            if (data.length > 0) {
              setFavList(data);
            }
          }
        }
      } catch (e) { console.error(e); }
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
      <FlatList style={{width: '100%'}} data={busStopData} renderItem={({item}) => {
        return busDisplay(favList, item, route);
      }}/>
    </View>
  );
};

const busDisplay = (favList, item, route) => {
  if (favList.length > 0) {
    favList.forEach(i => {
      if (i.BusStopCode === route.params.code && i.BusNumber === item.BusNumber) {
        console.log(i);
        return (
          <View style={styles.flex}>
            <Text style={styles.number}>{item.BusNumber}</Text>
            <FlatList style={styles.data} data={item.BusData} renderItem={({item, index}) => {
              return busModel(item, index);
            }}/>
            <TouchableHighlight style={{width: '100%',}} onPress={async() => {
              const newValues = {
                BusStopCode: route.params.code,
                BusNumber: item.BusNumber
              }
              try {
                for (let i = 0; i > -1; i++) {
                  let jsonValue = await AsyncStorage.getItem(`${i}`);
                  if (jsonValue === null) {
                    await AsyncStorage.setItem(`${i}`, JSON.stringify(newValues));
                    break;
                  }
                }
              } catch (e) { console.error(e) }
            }}>
              <Ionicons style={styles.icon} name={'heart'} size={24} />
            </TouchableHighlight>
          </View>)
          } else {
        return (<View style={styles.flex}>
          <Text style={styles.number}>{item.BusNumber}</Text>
          <FlatList style={styles.data} data={item.BusData} renderItem={({item, index}) => {
            return busModel(item, index);
          }}/>
          <TouchableHighlight style={{width: '100%',}} onPress={async() => {
            const newValues = {
              BusStopCode: route.params.code,
              BusNumber: item.BusNumber
            }
            try {
              for (let i = 0; i > -1; i++) {
                let jsonValue = await AsyncStorage.getItem(`${i}`);
                if (jsonValue === null) {
                  await AsyncStorage.setItem(`${i}`, JSON.stringify(newValues));
                  break;
                }
              }
            } catch (e) { console.error(e) }
          }}>
            <Ionicons style={styles.icon} name={'heart-outline'} size={24} />
          </TouchableHighlight>
        </View>)
      }
    });
  } else {
    return (<View style={styles.flex}>
          <Text style={styles.number}>{item.BusNumber}</Text>
          <FlatList style={styles.data} data={item.BusData} renderItem={({item, index}) => {
            return busModel(item, index);
          }}/>
          <TouchableHighlight style={{width: '100%',}} onPress={async() => {
            const newValues = {
              BusStopCode: route.params.code,
              BusNumber: item.BusNumber
            }
            try {
              for (let i = 0; i > -1; i++) {
                let jsonValue = await AsyncStorage.getItem(`${i}`);
                if (jsonValue === null) {
                  await AsyncStorage.setItem(`${i}`, JSON.stringify(newValues));
                  break;
                }
              }
            } catch (e) { console.error(e) }
          }}>
            <Ionicons style={styles.icon} name={'heart-outline'} size={24} />
          </TouchableHighlight>
        </View>)}
}

const busModel = (item, index) => {
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
}

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  number: {
    width: '20%',
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
    borderRadius: 10,
  },
  icon: {
    justifyContent: 'center',
  },
  data: { 
    width: '70%',
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },
  busIcon: {
    width: 50,
    resizeMode: 'contain',
    marginTop: 25
  }
});

export default busStop; 

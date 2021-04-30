import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourite = ({ navigation }) => {
  const [favData, setFavData] = useState(null);
  const [message, setMessage] = useState(<Text>No data is being stored</Text>);

  const setData = async() => {
    let data = [];
    try {
      await AsyncStorage.clear();
      // for (let i = 1; i > 0; i++) {
      //   let jsonValue = await AsyncStorage.getItem(`${i}`);
      //   if (jsonValue !== null) {
      //     data.push(JSON.parse(jsonValue));
      //   } else {
      //     break;
      //   }
      // }
      // if (data.length !== 0) {
      //   setFavData(data);
      //   setMessage(<></>);
      //   console.log(data);
      // }
    } catch (e) { console.error(e) }
  }
  
  useEffect(() => {
    setData();
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {message}
      <FlatList data={favData} renderItem={({item, index}) => (
        <View>
          <Text>{item.BusStopCode}</Text>
        </View>
      )}/>
    </View>
  );
}

export default Favourite;

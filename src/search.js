import { Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

const search = ({navigation}) => {
    const [message, setMessage] = useState(<></>);
    const [searchText, setSearchText] = useState("");
    const [dataReturned, setData] = useState([]);

    const accKey = "We/4SNhISV+moxrLY/BVrw==";

    const getData = async() => {
        if (searchText.length > 4) {
            await fetch(`https://babasama.com/api/get_bus_stop_data?BusStopCode=${searchText}&AccountKey=${accKey}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setMessage(<></>);
            });
        } else if (searchText > 0) {
            await fetch(`https://babasama.com/api/get_bus_data?BusNumber=${searchText}&AccountKey=${accKey}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setMessage(<></>);
            });
        }
    }

    return(<View style={styles.container}>
        <View style={styles.searchbg}>
            <View style={styles.textinputContainer}>
            <TextInput style={styles.textinput} placeholder="Search" onChangeText={setSearchText}/>
                <View style={styles.textinputSearchButton}>
                    <TouchableHighlight onPress={() => {
                        getData();
                        setMessage(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>);
                    }}>
                        <Ionicons name="search-outline" size={20}/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <View style={styles.listbg}>
            {message}
            <FlatList data={dataReturned} renderItem={({item, index}) => {
                if (searchText < 5) {
                    return (<View>
                        <Text>{item.ServiceNo}</Text>
                    </View>);
                } else {
                    return (<View>
                        <Text>{item.BusStopCode}</Text>
                    </View>)
                }
            }}/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    }, searchbg: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, listbg: {
        width: '100%',
        flex: 2,
    }, textinputContainer: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
    }, textinput: {
        borderWidth: 2,
        borderColor: '#cfcfcf',
        width: '78%',
        height: 45,
        backgroundColor: '#ffffff',
        position: 'absolute',
        paddingHorizontal: 15,
    }, textinputSearchButton: {
        alignSelf: 'center',
        marginLeft: '65%'
    }
});

export default search;

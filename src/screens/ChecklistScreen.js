import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../conts/colors'
import themeContext from '../theam/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"

const listTap = [
    {
        status: 'All'
    },
    {
        status: 'Todo'
    },
    {
        status: 'Complete'
    },
]
const data = [
    {
        title: 'Read a book',
        status: 'Complete'
    },
    {
        title: 'Clean home',
        status: 'Complete'
    },
    {
        title: 'Create todo App',
        status: 'Todo'
    },
    {
        title: 'Go to pattaya',
        status: 'Todo'
    },
    {
        title: 'อาบน้ำแมว',
        status: 'Complete'
    },
    {
        title: 'รดน้ำต้นไม้',
        status: 'Complete'
    },
    {
        title: 'Final exam',
        status: 'Todo'
    },
    {
        title: 'Present App',
        status: 'Todo'
    },
]

const ChecklistScreen = () => {
   
    const [status, setStatus] = useState('All')
    const [datalist, setDatalist] = useState(data)
    const setStatusFilter = status => {
        if (status !== 'All') {
            setDatalist([...data.filter(e => e.status === status)])
        } else {
            setDatalist(data)
        }
        setStatus(status)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemList}>
                    <Text style={[styles.itemName, { color: theme.color }]}>{item.title}</Text>
                </View>
            </View>
        )
    }

    const separator = () => {
        return <View style={{ backgroundColor: theme.color, borderWidth: .5 }} />
    }

    const [SearchText, setSearchText] = useState('')
    const theme = useContext(themeContext)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.listTap}>
                {
                    listTap.map(e => (
                        <TouchableOpacity
                            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                            onPress={() => setStatusFilter(e.status)}
                        >
                            <Text style={[styles.txtTab, status === e.status && styles.txtTabActive, { color: theme.color }]}>
                                {e.status}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TextInput
                onChangeText={(text) => {
                    setSearchText(text)
                }}
                style={{
                    backgroundColor: COLORS.grey,
                    height: 35,
                    borderRadius: 10,
                    padding: 10,
                    borderWidth: 0.5
                }}
                placeholder='Search' />
            <FlatList
                data={datalist.filter(e => e.title.toLowerCase().includes(SearchText.toLowerCase()))} 
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={separator}
            />
        </SafeAreaView>
    )
}

export default ChecklistScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        padding: 20,
    },
    listTap: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    btnTab: {
        width: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.red,
        padding: 5,
        justifyContent: 'center',
        borderRadius: 15,
        marginHorizontal: 6
    },
    txtTab: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnTabActive: {
        backgroundColor: COLORS.red
    },
    txtTabActive: {
        color: COLORS.red
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    itemList: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemStatus: {
        paddingHorizontal: 6,
        justifyContent: 'center',
        right: 12
    }
})
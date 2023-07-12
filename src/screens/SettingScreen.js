import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../conts/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons';

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../theam/themeContext';

export default function SettingScreen({ navigation }) {

  let [switchnotifications, setSwitchnotifications] = React.useState(false)
  let [switchwifi, setSwitchWifi] = React.useState(false)
  const toggleWifi = (value) => {
    setSwitchWifi(value)
  }
  const toggleNotifications = (value) => {
    setSwitchnotifications(value)
  }

  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({ ...userDetails, loggedIn: false }),
    );
    navigation.navigate('LoginScreen');
  };

  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)


  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <Image style={styles.imgpro} source={require('../img/profile.png')} />
      <Text style={[styles.txtname, {color:theme.color}]}>
        {userDetails?.email}
      </Text>
      <View style={styles.btLogout}>
        <Button title="Logout" onPress={logout} />
      </View>

      <View style={styles.items}>
        <Text style={[styles.text, {color:theme.color}]}>Notifications</Text>
        <Switch value={switchnotifications} onValueChange={toggleNotifications} />
      </View>
      <View style={styles.items}>
        <Text style={[styles.text, {color:theme.color}]}>Wi-Fi</Text>
        <Switch value={switchwifi} onValueChange={toggleWifi} />
      </View>
      <View style={styles.items}>
        <Text style={[styles.text, {color:theme.color}]}>Dark Mode</Text>
        <Switch 
          value={darkMode} 
          onValueChange={(value) => {
            setDarkMode(value)
            EventRegister.emit('ChangeTheme', value)
          }} 
        />
      </View>
      <View style={[styles.items,
      { marginTop: 15, justifyContent: 'center' }]}
      >
        <Button title="show switch value"
          onPress={
            () => {
              let n = switchnotifications ? 'On' : 'Off'
              let w = switchwifi ? 'On' : 'Off'
              let d = darkMode ? 'On' : 'Off'
              let t = `Notifications: ${n}, Wi-Fi: ${w}, Dark Mode: ${d}`
              Alert.alert('Status',t)
            }
          }
        />
      </View>
      <View style={styles.Button}>
        <Text style={[styles.txtShare, {color:theme.color}]}>Share With : </Text>
        <TouchableOpacity onPress={() => Alert.alert('SUCCESSFUL', 'Share with Facebook')}>
          <Image source={require('../img/Facebook_Logo.png')} style={styles.imgLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('SUCCESFUL', 'Share with Messenger')}>
          <Image source={require('../img/Messenger_Logo.png')} style={styles.imgMes} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('SUCCESFUL', 'Share with LINE')}>
          <Image source={require('../img/LINE_logo.png')} style={styles.imgLogo} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.txtContact, {color:theme.color}]}>Contact us :</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 85 }}>
        <FontAwesome name="user-circle" size={24} color={theme.color} />
        <Text style={{color:theme.color}}>   ธนภูมินทร์ บุญุบุตร 6321602604</Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 85 }}>
        <FontAwesome name="user-circle" size={24} color={theme.color} />
        <Text style={{color:theme.color}}>   วราลักษณ์ เสาวปิตุกุล 6321600172</Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 85 }}>
        <FontAwesome name="user-circle" size={24} color={theme.color} />
        <Text style={{color:theme.color}}>   ชนาธิป สุขศรี 6321602566</Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    paddingVertical: 50,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 60,
  },
  text: {
    fontSize: 20,
  },
  imgpro: {
    width: 120,
    height: 120,
    marginBottom: 20,
    marginHorizontal: 140
  },
  txtname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  btLogout: {
    width: 100,
    left: 140,
    marginBottom: 20
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    marginBottom: 0
  },
  imgLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 20
  },
  imgMes: {
    width: 58,
    height: 58,
    marginHorizontal: 20
  },
  txtShare: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  txtContact: {
    marginHorizontal: 50, 
    padding: 10
  }
})


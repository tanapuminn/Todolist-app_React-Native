import { StyleSheet, Text, View, SafeAreaView, Image, Alert, Keyboard } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'
import Button from '../components/Button'
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'
import HomeScreen from './HomeScreen'


const LoginScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({ email: '', password: '' });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            login();
        }
    };
    const login = () => {
        setLoading(true);
        setTimeout(async () => {
          setLoading(false);
          let userData = await AsyncStorage.getItem('userData');
          if (userData) {
            userData = JSON.parse(userData);
            if (
              inputs.email == userData.email &&
              inputs.password == userData.password
            ) {
              navigation.navigate('BottomTab');
              AsyncStorage.setItem(
                'userData',
                JSON.stringify({...userData, loggedIn: true}),
              );
            } else {
              Alert.alert('Error', 'Invalid Details');
            }
          } else {
            Alert.alert('Error', 'User does not exist');
          }
        }, 3000);
      };
    
      const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
    
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={styles.container}>

        <Image style={styles.img} source={require('../img/logo.png')} />

        <Text style={styles.txtHead}>
          Log In
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            // label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            // label="Password"
            placeholder="Enter your password"
            maxLength={5}
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50, 
        paddingHorizontal: 20,
        backgroundColor: COLORS.blue,
        flex: 1
      },
      img: {
        width: 150,
        height: 150,
        marginHorizontal: 100,
        borderRadius: 100,
        marginBottom: 30
      },
      txtHead: {
        color: COLORS.black, 
        fontSize: 40, 
        fontWeight: 'bold',
        textAlign: 'center',
      },
})

export default LoginScreen;
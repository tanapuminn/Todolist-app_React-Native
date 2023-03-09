import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, Image,StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegistrationScreen = ({navigation}) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
        confirmpassword: '',
      });
      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);
    
      const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
    
        if (!inputs.email) {
          handleError('Please input email', 'email');
          isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
          handleError('Please input a valid email', 'email');
          isValid = false;
        }
    
        if (!inputs.password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (inputs.password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        } 
        
        if (!inputs.confirmpassword) {
          handleError('Please input password again', 'confirmpassword');
          isValid = false;
        } else if (inputs.confirmpassword != inputs.password) {
          handleError('Please input password again', 'confirmpassword');
          isValid = false;
        }
    
        if (isValid) {
          register();
        }
      };
    
      const register = () => {
        setLoading(true);
        setTimeout(() => {
          try {
            setLoading(false);
            AsyncStorage.setItem('userData', JSON.stringify(inputs));
            navigation.navigate('LoginScreen');
    
            console.log(inputs)
          } catch (error) {
            Alert.alert('Error', 'Something went wrong');
          }
        }, 3000);
      };
    
      const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
      };
      const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
      };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Image style={styles.img} source={require('../img/logo.png')} />
        <Text style={styles.txtHead}>
          Register
        </Text>
        <View style={{ marginVertical: 20 }}>
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
            error={errors.password}
            password
          />
          <Input
            onChangeText={text => handleOnchange(text, 'confirmpassword')}
            onFocus={() => handleError(null, 'confirmpassword')}
            iconName="lock-outline"
            // label="Confirm Password"
            placeholder="Enter your password again"
            error={errors.confirmpassword}
            password
          />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.blue
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
      textAlign: 'center'
    }
    
  })

export default RegistrationScreen;
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.white,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 15
      }}>
      <Text style={{color: COLORS.black, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
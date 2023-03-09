import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'


const Loader = ({visible = false}) => {
    const {width, height} = useWindowDimensions();
  return (
    visible && (
        <View style={[styles.container, {height, width}]}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.blue} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      )
  )
}

export default Loader

const styles = StyleSheet.create({
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
      },
})
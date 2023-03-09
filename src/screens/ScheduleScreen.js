import { Image, View, Animated, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native'
import COLORS from '../conts/colors'
import { Calendar } from 'react-native-calendars'
import React, { useState, useEffect } from 'react';


const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Schedule</Text>
      <Calendar 
        style={styles.calendar} 
        markingType={'period'}
        // markedDates={{
        //     '2023-03-03': {marked: true, selected: true, selectedColor: 'red'}
        // }}
        markedDates={{
            '2023-03-13': {startingDay: true, color: 'lightgreen'},
            '2023-03-14': {marked: true, color: 'lightgreen', dotColor: 'red'},
            '2023-03-15': {marked: true, color: 'lightgreen', dotColor: 'transparent'},
            '2023-03-16': {endingDay: true, color: 'lightgreen'},
            '2023-04-12': {startingDay: true, endingDay: true, color: 'orange'},
            '2023-04-03': {marked:true, }
        }}
        />
    </View>
  )
}


export default ScheduleScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    paddingVertical: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  calendar: {
    borderRadius: 10,
    elevation: 15,
    margin: 10
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  }
})
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
 // Appearance,
} from 'react-native'
import React, { useState,useContext } from 'react'
import COLORS from '../conts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import themeContext from '../theam/themeContext'



const HomeScreen = ({ navigation }) => {

  const [todos, setTodos] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');
  const theme = useContext(themeContext)

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
        date: selectDate
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
      setSelectDate('Select Date')
    }
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };
  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1,flexDirection: 'column' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: COLORS.black,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.date}
          </Text>
        </View>

        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={[styles.actionIcon, { backgroundColor: 'green' }]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  //date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState('Select Date')

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    const dt = new Date(date)
    const x = dt.toISOString().split('T')
    const x1 = x[0].split('-')
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
    setSelectDate(x1[2] + '/' + x1[1] + '/' + x1[0])
    hideDatePicker();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: theme.color,
          }}>
          All Task
        </Text>
        <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10, paddingBottom: 180 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={[styles.footer, {backgroundColor:theme.background}]}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add your new task."
            onChangeText={text => setTextInput(text)}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.btDate}>{selectDate}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add-circle" color={theme.color} size={50} />
          </View>
        </TouchableOpacity>
      </View>


        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS.blue, //'#BABBC3'// 
    marginBottom: 50
  },
  inputContainer: {
    height: 70,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: '#fff',
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    // backgroundColor: COLORS.black,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: '#fff',//COLORS.white
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: '#fff',// COLORS.white
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  btDate: {
    // borderWidth: .8,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    width: '50%',
    // backgroundColor: COLORS.white
  },
})

export default HomeScreen;
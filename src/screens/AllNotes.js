import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
// import { Divider, List, ListItem, Text } from "@ui-kitten/components"
import React, { useState, useContext } from "react"
import { StyleSheet, View, Divider, Modal, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Button,ScrollView } from "react-native"
import COLORS from "../conts/colors"
import { AntDesign } from '@expo/vector-icons';
import themeContext from '../theam/themeContext';


export default function AllNotes({ navigation }) {
	const [notes, setNotes] = useState([])
	const theme = useContext(themeContext)

	//
	const [isRender, setIsRender] = useState(false)
	const [isModalVisibal, setIsModalVisible] = useState(false)
	const [inputText, setInputText] = useState()
	const [editItem, setEditItem] = useState()

	const onPressItem = (notes) => {
		setIsModalVisible(true)
		setInputText(notes)
		setEditItem(notes)
	}
	const handleEditItem = async (editItem) => {
		const newData = notes.map(notes => {
			if (notes == editItem) {
				notes = inputText;
				return notes
			}
			return notes
		})
		await AsyncStorage.setItem("NOTES", JSON.stringify(newData))
		setNotes(newData)
		setIsRender(!isRender)
	}
	const onPressSaveEdit = () => {
		handleEditItem(editItem)
		setIsModalVisible(false)
	}

	//

	useFocusEffect(
		React.useCallback(() => {
			getNotes()
		}, [])
	)

	const getNotes = () => {
		AsyncStorage.getItem("NOTES").then((notes) => {
			setNotes(JSON.parse(notes))
		})
	}
	const deleteNote = async () => {
		const newNotes = notes.filter((note) => note !== inputText )
		await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate('AllNotes'))
		// navigation.navigate('AllNotes')
	}

	const ListItem = ({ notes }) => {
		return (
			<View style={[styles.container, { backgroundColor: theme.background }]}>
				<TouchableOpacity onPress={() => onPressItem(notes)}>
					<View style={styles.notes}>
						<Text style={styles.txtNote}>{notes}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<View style={styles.headerText}>
				<AntDesign name="caretleft" size={24} color={theme.color} onPress={() => navigation.navigate('Notes')} />
				<Text style={[styles.title, { color: theme.color }]}>Notes</Text>
				<AntDesign name="pluscircle" size={44} color={theme.color} onPress={() => navigation.navigate('CreateNote')} />
			</View>
			<FlatList
				data={notes}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => <ListItem notes={item} />}
				extraData={isRender} //
			/>
			<Modal
				animationType='fade'
				visible={isModalVisibal}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View style={[styles.modalView, { backgroundColor: theme.background }]}>
					<View style={styles.modalContent}>
					<Text style={styles.textTitle}>Note : </Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setInputText(text)}
						defaultValue={inputText}
						editable={true}
						multiline={true}
						maxLength={100}
					/>
					<View style={{flexDirection:"row"}}>
						<View style={styles.button}>
							<Button title="Edit" onPress={onPressSaveEdit} color='green' />
						</View>
						<View style={styles.button}>
							<Button title="Delete" onPress={deleteNote} color='red' />
						</View>
					</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#cff6ff",
		flex: 1,
	},
	item: {
		marginVertical: 4
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
	},
	notes: {
		margin: 10,
		marginBottom: 0,
	},
	txtNote: {
		// color: 'black',
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
	},
	imgHead: {
		width: 30,
		height: 30
	},
	headerText: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 40,
		marginBottom: 0,
		marginHorizontal: 20,
	},
	modalView: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: "#cff6ff",
	},
	textInput: {
		width: '70%',
		height: 'auto',
		borderColor: 'grey',
		borderWidth: 1,
		fontSize: 22,
		padding: 8
	},
	textTitle: {
		marginVertical: 40,
		fontSize: 30,
		fontWeight: 'bold'
	},
	button: {
		padding: 10,
		width: 100,
		marginVertical: 20
	},
	modalContent: {
		alignItems: 'center',
		backgroundColor: COLORS.white,
		width: 300,
		top: 200,
		height: 'auto',
		borderRadius: 20
	}
})

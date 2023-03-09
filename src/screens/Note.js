import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
// import { Button, Text } from "@ui-kitten/components"
import React, { useState, useContext } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import COLORS from "../conts/colors"
import themeContext from '../theam/themeContext';

export default function Note({ route }) {
	const [ notes, setNotes ] = useState([])
	const { singleNote } = route.params
	const navigation = useNavigation()
	const theme = useContext(themeContext)

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
		const newNotes = await notes.filter((note) => note !== singleNote)
		await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate("AllNotes"))
	}

	return (
		<View style={[styles.container, {backgroundColor:theme.background}]}>
			<Text style={[styles.title, {color:theme.color}]}>
				Notes
			</Text>
			<Text style={styles.txtNote}>{singleNote}</Text>
			<View style={styles.bottom}>
				<Button title="Delete" onPress={deleteNote} color='red'/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#cff6ff",
		alignItems: "center",
	},
	item: {
		marginVertical: 4
	},
	title: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 30,
		fontWeight: 'bold',
		color: COLORS.black
	},
	notes: {
		fontSize: 24
	},
	txtNote: {
		fontSize: 22, 
		margin: 20,
		backgroundColor: COLORS.white,
		width: 300,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
	}
})

import AsyncStorage from "@react-native-async-storage/async-storage"
// import { Button } from "@ui-kitten/components"
import React, { useState,useContext } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View,Button, Text} from "react-native"
import COLORS from "../conts/colors"
import themeContext from '../theam/themeContext';

export default function CreateNote({navigation}) {
	const [ note, setNote ] = useState("")
	const theme = useContext(themeContext)
	const saveNote = async () => {
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(note)
		await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate('AllNotes'))
		setNote("")
	}
	

	return (
		<View style={[styles.container, {backgroundColor:theme.background}]}>
			<Text style={[styles.txthead, {color:theme.color}]}>Add your note</Text>
			<View style={{borderWidth:1, height:'auto',borderColor:theme.color}}>
			<TextInput
				value={note}
				onChangeText={setNote}
				style={{ color: theme.color, fontSize: 22 }}
				multiline={true}
				autoFocus
				selectionColor={theme.color}
				placeholder="ADD NOTE HERE"
				// styles={{color:theme.color}}
			/>
			</View>
			<KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.bottom}>
				<Button title='Create Note' appearance="filled" onPress={saveNote}/>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#cff6ff",
		color: "white",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	button: {
		marginBottom: 30,
	},
	txthead: {
		fontSize: 24,
		marginBottom: 10,
		fontWeight: 'bold',
	}
})

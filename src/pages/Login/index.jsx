import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
    return (
        <View style={LoginStyle.container}>
            <Text style={LoginStyle.titulo}>Login </Text>
            <View style={LoginStyle.inputsContainer}>
                <TextInput style={LoginStyle.input} placeholder="Email" />
                <TextInput style={LoginStyle.input} placeholder="Senha" />
                <TouchableOpacity style={LoginStyle.button} onPress={() => { }}>
                    <Text style={LoginStyle.buttonText}>Entrar </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}


const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputsContainer: {
        width: '90%',
        backgroundColor: '#333333',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 5,
    },

    titulo: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 20,
    },

    input: {
        backgroundColor: '#ffffff19',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#00611a',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function CadastroUsuario() {
    return(
        <View style={CadUserStyles.container}>
            <Text style={CadUserStyles.texto}>Cadastro de Usuário</Text>
            <TextInput style={CadUserStyles.input} placeholder="Nome" />
            <TextInput style={CadUserStyles.input} placeholder="E-mail" />
            <TextInput style={CadUserStyles.input} placeholder="Senha" />
            <TouchableOpacity style={CadUserStyles.botao}>
                <Text style={CadUserStyles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
        </View>

    )
}


const CadUserStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    texto: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#eeeeee1a',
        fontSize: 16,
        padding: 15,
        marginBottom: 15,
        borderRadius: 7,
    },
    botao: {
        backgroundColor: '#0031b7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
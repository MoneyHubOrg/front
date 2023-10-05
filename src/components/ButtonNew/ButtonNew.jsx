import React from 'react'

import Feather from 'react-native-vector-icons/Feather';

import { View, Text, StyleSheet } from 'react-native'

export default function ButtonNew({ color, size }){
    return (
        <View style={styles.container}>
            <Feather name="plus" color={color} size={size} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#7305CA",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
    }
})
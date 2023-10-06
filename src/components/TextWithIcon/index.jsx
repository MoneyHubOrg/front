import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArrowsUpDown from 'react-native-vector-icons/Feather';


export default function TextWithIcon(props) {
    const styles = TextWithIconStyles(props);
    return (
        <View style={styles.container}>
            <View style={styles.ladoEsquerdo}>
                {(props.icon == 'despesa') ? <ArrowsUpDown name="arrow-down-circle" color={props.colorValor} size={40} /> : <ArrowsUpDown name="arrow-up-circle" color={props.colorValor} size={40} />}
            </View>
            <View style={styles.ladoDireito}>
                <Text style={styles.text}>{props.text} </Text>
                <Text style={styles.valor}>{props.valor}</Text>
            </View>
        </View>
    )
}


const TextWithIconStyles = (props) => StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        ladoEsquerdo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        ladoDireito: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        text: {
            fontSize: 14,
            color: props.colorTitulo ?? '#000',
            marginLeft: 8,
            textAlign: 'left',
            width: '100%',
            paddingLeft: 8,
        },
        valor: {
            fontSize: 18,
            color: props.colorValor ?? '#000',
            marginLeft: 8,
            fontWeight: 'bold',
            width: '100%',
            paddingLeft: 8,

        },
    })
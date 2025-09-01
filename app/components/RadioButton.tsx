import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
    label: string;
    value: string;
    selected: boolean;
    onPress: () => void;
}

const RadioButton: React.FC<Props> = ({ label, selected, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.outer, selected && styles.outerSelected]}>
            {selected && <View style={styles.inner} />}
        </View>
        <Text style= {styles.label}>{label}</Text>
    </TouchableOpacity>
);

export default RadioButton;

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
    outer: {
        width: 20, height: 20, borderRadius: 20,
        borderWidth: 2, borderColor: colors.muted,
        alignItems: 'center', justifyContent: 'center'
    },
    outerSelected: { borderColor: colors.primary },
    inner: { width: 10, height: 10, borderRadius: 10, backgroundColor: colors.primary },
    label: { marginLeft: 8, color: colors.white }
})

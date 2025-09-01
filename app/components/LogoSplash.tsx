import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, LogBox } from 'react-native';
import { colors } from '../theme';

const LogoSplash: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
    const scale = React.useRef(new Animated.Value(0.85)).current;
    const opacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 1.05, duration: 600, useNativeDriver: true
                }),
                Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true
                })
            ]),
            Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.delay(600) 
        ]).start(() => onDone && onDone());
    }, [scale, opacity, onDone]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoBox, { transform: [{ scale }], opacity }]}>
                <Text style={styles.logoText}>NextGenPay</Text>
            </Animated.View>
        </View>
    );
};

export default LogoSplash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryDark },
    logoBox: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: colors.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 12,
        elevation: 6  },
    logoText: { color: colors.white, fontSize: 28, fontWeight: '800', letterSpacing: 0.5 }
});
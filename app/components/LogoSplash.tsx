import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme';

const LogoSplash: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
    const scale = React.useRef(new Animated.Value(0.85)).current;
    const opacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 1.05, dur
                })
            ])
        ])
    })

}
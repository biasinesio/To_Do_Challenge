import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface StyledTextProps extends TextProps {
    fontWeight?: 'normal' | 'bold';
}

const StyledText: React.FC<StyledTextProps> = ({ children, style, fontWeight = 'normal', ...props }) => {
    const font = fontWeight === 'bold' ? styles.bold : styles.regular;

    return (
        <Text style={[font, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    regular: {
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0.5, 
    },
    bold: {
        fontFamily: 'Roboto-Bold',
        letterSpacing: 0.5, 
    },
});

export default StyledText;
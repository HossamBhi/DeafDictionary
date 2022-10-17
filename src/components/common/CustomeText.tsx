import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

interface CustomeTextProps {
  children?: any;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}
const CustomeText = ({children, style, ...props}: CustomeTextProps) => {
  const {colors} = useTheme();
  return (
    <Text style={[{color: colors.text}, style]} {...{...props}}>
      {children}
    </Text>
  );
};

export default CustomeText;

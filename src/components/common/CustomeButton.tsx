import React, {ReactElement} from 'react';
import {Pressable, StyleProp} from 'react-native';
import CustomeText from './CustomeText';

export interface CustomeButtonProps {
  onPress?: any;
  text?: string | any;
  style?: StyleProp<any>;
  disabled?: boolean;
  textStyle?: StyleProp<any>;
  icon?: any;
  children?: ReactElement<any, any>;
}

export default ({
  disabled,
  text,
  onPress,
  style,
  textStyle,
  icon,
  children,
}: CustomeButtonProps) => (
  <Pressable
    style={[style, disabled && {backgroundColor: '#dddddd'}]}
    onPress={onPress}
    disabled={disabled ? true : false}>
    {text && (
      <CustomeText style={[textStyle, disabled && {color: '#B1B1B1'}]}>
        {text}
      </CustomeText>
    )}
    {icon && icon}
    {children && children}
  </Pressable>
);

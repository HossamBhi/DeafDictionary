import React from 'react';
import {useTheme} from 'react-native-paper';
import useRFontValue from '../../hooks/useRFontValue';
import {Feather} from '@expo/vector-icons';
import {StyleProp} from 'react-native';

interface CustomeIconProps {
  Tag?: any;
  name?: string;
  style?: StyleProp<any>;
  size?: number;
  color?: string;
}

export default ({
  Tag = Feather,
  name,
  style,
  size,
  color,
}: CustomeIconProps) => {
  const {colors} = useTheme();
  return (
    <Tag
      name={name}
      size={useRFontValue(size || 24)}
      color={color || colors.text}
      style={style}
    />
  );
};

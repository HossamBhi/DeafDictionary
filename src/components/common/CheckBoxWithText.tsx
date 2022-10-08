import React, {FC} from 'react';
import {Pressable, StyleProp} from 'react-native';
import {Checkbox, useTheme} from 'react-native-paper';
import CustomeText from './CustomeText';

interface CheckboxWithTextProps {
  text?: string;
  checked?: boolean;
  setChecked: (x?: any) => void;
  checkColor?: any;
  TStyle?: StyleProp<any>;
  style?: StyleProp<any>;
  uncheckedColor?: any;
}
const CheckboxWithText: FC<CheckboxWithTextProps> = ({
  text,
  checked,
  setChecked,
  checkColor,
  TStyle,
  style,
  uncheckedColor,
}) => {
  const {colors} = useTheme();
  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: -7,
        },
        style,
      ]}
      onPress={() => setChecked(!checked)}>
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!checked)}
        color={checkColor || colors.primary}
        uncheckedColor={uncheckedColor ? uncheckedColor : '#979797'}
      />
      <CustomeText style={[{fontSize: 14, flex: 1, fontWeight: '400'}, TStyle]}>
        {text}
      </CustomeText>
    </Pressable>
  );
};

export default CheckboxWithText;

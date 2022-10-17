import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomeButton, {CustomeButtonProps} from './CustomeButton';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10000,
  },
  text: {
    color: '#ffffff',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 14,
  },
});
const BlockButton: FC<CustomeButtonProps> = ({
  disabled,
  text,
  onPress,
  style,
  textStyle,
  icon,
  children,
}) => {
  const {colors} = useTheme();
  return (
    <CustomeButton
      style={[styles.container, {backgroundColor: colors.primary}, style]}
      textStyle={[styles.text, textStyle]}
      {...{disabled, text, onPress, icon, children}}
    />
  );
};

export default BlockButton;

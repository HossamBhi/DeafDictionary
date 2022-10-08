import {t} from 'i18next';
import React from 'react';
import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomeText from './CustomeText';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 20,
    // shadow
    shadowColor: '#00000005',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 11,
    lineHeight: 11,
    color: '#9B9B9B',
  },
  input: {
    fontSize: 14,
    lineHeight: 21,
  },
});

interface TextInputProps {
  title?: string;
  placeholder?: string;
  value?: any;
  onChangeText?: any;
  containerStyle?: StyleProp<any>;
  titleStyle?: StyleProp<any>;
  inputStyle?: StyleProp<any>;
  [key: string]: any;
}

export default ({
  containerStyle,
  titleStyle,
  inputStyle,
  title,
  placeholder,
  value,
  onChangeText,
  ...props
}: TextInputProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.surface},
        containerStyle,
      ]}>
      {value?.length > 0 && title && (
        <CustomeText style={[styles.title, titleStyle]}>{title}</CustomeText>
      )}
      <TextInput
        placeholder={placeholder || title || t('typeSomeThing')}
        placeholderTextColor={'#9B9B9B'}
        style={[styles.input, {color: colors.text}, inputStyle]}
        {...{value, onChangeText, ...props}}
      />
    </View>
  );
};

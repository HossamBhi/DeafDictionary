import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CustomeText from '../common/CustomeText';

interface LoginErrorMsgProps {
  message?: string;
  style?: StyleProp<ViewStyle>;
  hideImage?: boolean;
  TStyle?: StyleProp<TextStyle>;
}

export default ({message, style, hideImage, TStyle}: LoginErrorMsgProps) => (
  <View style={[styles.container, style]}>
    {hideImage !== true && (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/alert.png')}
      />
    )}
    <CustomeText style={[styles.text, TStyle]}>{message}</CustomeText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DC484B',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 13,
    flexDirection: 'row',
    paddingHorizontal: 13,
    alignItems: 'center',
  },
  text: {fontSize: 11, color: '#fff', flex: 1},
  image: {
    maxWidth: 25,
    maxHeight: 25,
    marginEnd: 10,
  },
});

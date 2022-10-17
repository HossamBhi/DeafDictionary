import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomeButton from '../common/CustomeButton';

export default ({text, textButton, onPress}) => (
  <View style={styles.terms}>
    <Text style={styles.termsText}>{text}</Text>
    <CustomeButton
      text={textButton}
      onPress={onPress}
      textStyle={[
        styles.termsText,
        {
          color: '#FF7260',
          paddingHorizontal: 6,
          textDecorationLine: 'underline',
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  terms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  termsText: {
    color: '#5B5A5A',
    fontSize: 16,
    textAlign: 'center',
  },
  forgetText: {
    textAlign: 'right',
    color: '#C1C0C0',
    fontSize: 14,
  },
});

import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Animated, {Layout, ZoomIn} from 'react-native-reanimated';
import CustomeText from '../common/CustomeText';

const RenderLetter = ({item}: {item: string}) => {
  const {colors} = useTheme();
  return (
    <Animated.View
      style={styles.letterCon}
      entering={ZoomIn.duration(1000)}
      layout={Layout}>
      <TouchableOpacity
        style={[styles.letterBtn, {backgroundColor: colors.surface}]}
        onPress={() => Alert.alert(item)}>
        <CustomeText style={styles.letter}>{item}</CustomeText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  letterCon: {paddingHorizontal: 5, paddingVertical: 5, width: '100%', flex: 1},
  letterBtn: {backgroundColor: '#333'},
  letter: {
    width: '100%',
    flex: 1,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default RenderLetter;

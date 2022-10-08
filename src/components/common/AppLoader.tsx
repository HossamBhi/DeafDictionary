import React from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {useTheme} from 'react-native-paper';

export default ({style}: {style?: StyleProp<ViewStyle>}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        },
        style,
      ]}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : 50}
        color={colors.primary}
        animating
      />
    </View>
  );
};

import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import CustomeImage from './CustomeImage';
import CustomeButton from './CustomeButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface SignVideoIconProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SignVideoIcon = ({text, style, onPress}: SignVideoIconProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <CustomeButton
      style={style}
      onPress={
        onPress
          ? onPress
          : () =>
              navigation.navigate(
                'VideoPopup' as never,
                {videos: text} as never,
              )
      }>
      <CustomeImage
        isOpenImage={false}
        style={{width: 28, height: 28}}
        source={require('../../assets/signvideoicon.png')}
      />
    </CustomeButton>
  );
};

export default SignVideoIcon;

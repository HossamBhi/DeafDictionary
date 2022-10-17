import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

interface SocialLogoProps {
  style?: StyleProp<ImageStyle>;
  image?: ImageSourcePropType;
  onPress?: () => void;
}

export default ({style, image, onPress}: SocialLogoProps) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      resizeMode="contain"
      source={image}
      style={[{width: 30, height: 30, marginHorizontal: 5}, style]}
    />
  </TouchableOpacity>
);

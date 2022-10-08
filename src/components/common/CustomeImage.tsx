import React from 'react';
import {Image, StyleProp, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface CustomeImageProps {
  source?: any;
  style?: StyleProp<any>;
  resizeMode?: string | any;
  isOpenImage?: boolean;
}
export default ({
  source,
  style,
  resizeMode,
  isOpenImage = true,
  ...props
}: CustomeImageProps) => {
  const navigation = useNavigation();

  if (isOpenImage) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'ImagesViewer' as never,
            {images: source} as never,
          )
        }>
        <Image
          source={source}
          style={[{minWidth: 30, minHeight: 30}, style]}
          resizeMode={resizeMode}
          {...props}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Image
      source={source}
      style={[{minWidth: 30, minHeight: 30}, style]}
      resizeMode={resizeMode}
      {...props}
    />
  );
};

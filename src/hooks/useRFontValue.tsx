import {useEffect, useState} from 'react';
import {Platform, StatusBar, useWindowDimensions} from 'react-native';

interface useResponsiveFontProps {
  value?: number;
  standardScreenHeight?: number;
}
// take percentage
const useRFontValue = (
  value = 14,
  standardScreenHeight = 800,
): useResponsiveFontProps => {
  const {width, height} = useWindowDimensions();
  const [font, setFont] = useState(value);
  useEffect(() => {
    const standardLength = width > height ? width : height;
    const offset =
      (width > height
        ? 0
        : Platform.OS === 'ios'
        ? 78
        : StatusBar.currentHeight) || 0;

    const deviceHeight =
      Platform.OS === 'android' ? standardLength - offset : standardLength;

    setFont((value * deviceHeight) / standardScreenHeight);
  }, [width]);
  // console.log("values: ", { width, height, font, value });

  return Math.round(font);
};

export default useRFontValue;

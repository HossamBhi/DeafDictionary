import {useWindowDimensions} from 'react-native';

export const useOrientation = () => {
  const windowInfo = useWindowDimensions();
  return {
    ...windowInfo,
    isPortrait: windowInfo.height > windowInfo.width,
  };
};

import { useWindowDimensions } from "react-native";

export default useOrientation = () => {
  const windowInfo = useWindowDimensions();
  return {
    ...windowInfo,
    isPortrait: windowInfo.height > windowInfo.width,
  };
};

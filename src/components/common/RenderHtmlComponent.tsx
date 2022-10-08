import React from 'react';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

export default function RenderHtmlComponent({html}: {html: string}) {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const tagsStyles = React.useMemo(
    () => ({body: {color: colors.text}}),
    [colors],
  );
  return (
    <RenderHtml contentWidth={width} source={{html}} tagsStyles={tagsStyles} />
  );
}

import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import CustomeButton from './CustomeButton';
import CustomeText from './CustomeText';

interface ListItemProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  rightPart?: JSX.Element;
  leftPart?: JSX.Element;
  centerPart?: JSX.Element;
  header?: any;
  notes?: any;
  headerStyle?: StyleProp<TextStyle>;
  notesStyle?: StyleProp<TextStyle>;
}

const ListItem: FC<ListItemProps> = ({
  onPress,
  style,
  rightPart,
  leftPart,
  centerPart,
  header,
  notes,
  headerStyle,
  notesStyle,
}) => {
  const {colors} = useTheme();
  return (
    <CustomeButton onPress={onPress} style={[styles.row, style]}>
      <>
        {rightPart && rightPart}
        {centerPart && centerPart}
        {header && (
          <View
            style={{
              paddingHorizontal: 12,
              flex: 1,
              justifyContent: 'center',
            }}>
            <CustomeText
              style={[{fontSize: 16, color: colors.text}, headerStyle]}
              numberOfLines={2}>
              {header}
            </CustomeText>
            {notes && (
              <CustomeText
                style={[
                  {
                    fontSize: 12,
                    color: colors.text + '70',
                    paddingTop: 4,
                  },
                  notesStyle,
                ]}>
                {notes}
              </CustomeText>
            )}
          </View>
        )}
        {leftPart && leftPart}
      </>
    </CustomeButton>
  );
};
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
export default ListItem;

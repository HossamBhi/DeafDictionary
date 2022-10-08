import React from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CustomeIcon from '../common/CustomeIcon';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {isRTL} from '../../langs';
import CustomeText from '../common/CustomeText';
import CustomeButton from '../common/CustomeButton';
import useRFontValue from '../../hooks/useRFontValue';

interface PageHeaderProps {
  text?: string;
  icon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  showBack?: boolean;
}

export default ({text, icon, style, showBack}: PageHeaderProps) => {
  const navigation = useNavigation();
  const {colors}: any = useTheme();
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.outline,
        },
      ]}>
      {showBack && (
        <CustomeButton
          icon={
            <CustomeIcon
              Tag={Ionicons}
              name={isRTL ? 'ios-arrow-forward' : 'ios-arrow-back'}
              size={24}
              color={colors.text}
            />
          }
          onPress={() =>
            navigation.canGoBack() ? navigation.goBack() : BackHandler.exitApp()
          }
          style={{paddingEnd: 10}}
        />
      )}
      {text && (
        <CustomeText
          style={[
            styles.text,
            {color: colors.text, fontSize: useRFontValue(16)},
          ]}>
          {text}
        </CustomeText>
      )}
      {icon && icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  text: {color: '#696969', flex: 1, paddingVertical: 6},
});

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
import SignVideoIcon from '../common/SignVideoIcon';
import CustomeTextInput from '../common/CustomeTextInput';
import {t} from 'i18next';

interface PageHeaderProps {
  text?: string;
  icon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  showBack?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder?: string;
  resultNum?: number;
  originNum?: number;
  signVideoOnPress?: () => void;
}

export default ({
  text,
  icon,
  style,
  showBack,
  searchValue,
  setSearchValue,
  placeholder,
  resultNum,
  originNum,
  signVideoOnPress,
}: PageHeaderProps) => {
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
      <CustomeTextInput
        placeholder={placeholder || t('writeNumber')}
        containerStyle={{flex: 1, paddingHorizontal: 10, borderRadius: 0}}
        onChangeText={setSearchValue}
        value={searchValue}
      />
      {originNum && (
        <CustomeText
          style={[styles.numBranches, {backgroundColor: colors.background}]}>
          {resultNum} / {originNum}
        </CustomeText>
      )}
      {searchValue?.trim()?.length > 0 && (
        <SignVideoIcon
          text={searchValue || ''}
          style={{marginStart: 20}}
          onPress={signVideoOnPress}
        />
      )}
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
  numBranches: {
    fontSize: 12,
    textAlignVertical: 'center',
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    color: '#a0a2a8',
    padding: 10,
    height: '100%',
  },
});

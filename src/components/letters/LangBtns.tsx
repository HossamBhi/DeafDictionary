import {t} from 'i18next';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomeButton from '../common/CustomeButton';

interface LangBtnsProps {
  isArabic: boolean;
  setIsArabic: (x: boolean) => void;
}

const LangBtns = ({isArabic, setIsArabic}: LangBtnsProps) => {
  const {colors}: any = useTheme();
  return (
    <View style={styles.container}>
      <CustomeButton
        text={t('arabic')}
        style={[
          styles.btn,
          {backgroundColor: isArabic ? colors.primary : colors.surfaceDisabled},
        ]}
        textStyle={[styles.btnText, {color: isArabic ? '#fff' : '#000'}]}
        onPress={() => setIsArabic(true)}
      />
      <CustomeButton
        text={t('english')}
        style={[
          styles.btn,
          {
            backgroundColor: !isArabic
              ? colors.primary
              : colors.surfaceDisabled,
          },
        ]}
        textStyle={[styles.btnText, {color: !isArabic ? '#fff' : '#000'}]}
        onPress={() => setIsArabic(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  btn: {
    paddingVertical: 14,
    // paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 16,
    marginTop: 30,
    width: '40%',
  },
  btnText: {
    textAlign: 'center',
  },
});
export default LangBtns;

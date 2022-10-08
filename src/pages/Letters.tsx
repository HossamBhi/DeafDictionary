import {t} from 'i18next';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomeText from '../components/common/CustomeText';
import PageHeader from '../components/pageHeader';
import Animated, {Layout, ZoomIn} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import LangBtns from '../components/letters/LangBtns';
import {useNavigation} from '@react-navigation/native';

const arabic_alpha = [
  'ا',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'ل',
  'م',
  'ن',
  'و',
  'ه',
  'ی',
];
const english_alpha = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const Letters = () => {
  const {colors} = useTheme();
  const [isArabic, setIsArabic] = useState(true);
  const navigation = useNavigation();

  const renderLetter = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return (
        <Animated.View
          style={styles.letterCon}
          entering={ZoomIn.duration(50 * index)}
          layout={Layout}>
          <TouchableOpacity
            style={[styles.letterBtn, {backgroundColor: colors.surface}]}
            onPress={() =>
              navigation.navigate(
                'VideoPopup' as never,
                {videos: item} as never,
              )
            }>
            <CustomeText style={styles.letter}>{item}</CustomeText>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [navigation, colors],
  );
  return (
    <View>
      <PageHeader text={t('letters')} />
      <LangBtns {...{isArabic, setIsArabic}} />
      <FlatList
        style={{paddingHorizontal: 20}}
        data={isArabic ? arabic_alpha : english_alpha}
        renderItem={renderLetter}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  letterCon: {paddingHorizontal: 5, paddingVertical: 5, width: '100%', flex: 1},
  letterBtn: {flex: 1, borderRadius: 2},
  letter: {
    width: '100%',
    flex: 1,
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default Letters;

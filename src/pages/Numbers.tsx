import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Animated, {Layout, ZoomIn} from 'react-native-reanimated';
import CustomeText from '../components/common/CustomeText';
import SearchBar from '../components/pageHeader/SearchBar';

const arabic_alpha = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
];

const Numbers = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');

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
    <View style={{flex: 1}}>
      <SearchBar {...{searchValue, setSearchValue}} />
      <FlatList
        style={{paddingHorizontal: 20}}
        contentContainerStyle={{paddingTop: 25}}
        data={arabic_alpha}
        renderItem={renderLetter}
        numColumns={4}
        ListFooterComponent={<View style={{height: 100}} />}
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
export default Numbers;

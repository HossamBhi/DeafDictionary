import {t} from 'i18next';
import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import PageHeader from '../components/pageHeader';
import Word from '../components/words/Word';
import {removeFavAction} from '../redux/favorites';
import {WordProps} from '../utils/types';

const Favorites = () => {
  const {favItems}: {favItems: {[key: string]: WordProps}} = useSelector(
    (state: any) => state.favorites,
  );
  const {colors} = useTheme();
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <PageHeader text={t('favorites')} showBack />
      <FlatList
        data={Object.values(favItems)}
        ItemSeparatorComponent={() => (
          <View
            style={{height: 5, width: '100%', backgroundColor: colors.surface}}
          />
        )}
        renderItem={({item}: {item: WordProps}) => (
          <Word
            item={item}
            onPress={() => dispatch(removeFavAction(item.id))}
          />
        )}
        ListFooterComponent={<View style={{height: 100}} />}
      />
    </View>
  );
};
export default Favorites;

import {t} from 'i18next';
import React, {useState} from 'react';
import {View} from 'react-native';
import SearchBar from '../components/pageHeader/SearchBar';

const Phrases = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={{flex: 1}}>
      <SearchBar
        {...{searchValue, setSearchValue}}
        placeholder={t('writePhrase')}
        signVideoOnPress={() => console.log('Sign Video Press')}
      />
    </View>
  );
};
export default Phrases;

import {t} from 'i18next';
import React, {useMemo, useState} from 'react';
import {View, FlatList} from 'react-native';
import SearchBar from '../components/pageHeader/SearchBar';
import CustomeVideoPlayer from '../components/CustomeVideoPlayer';
import {getUniqueId, removeLastWordInPhrase} from '../utils/helper';
import ListItem from '../components/common/ListItem';
import CustomeIcon from '../components/common/CustomeIcon';
import {useTheme} from 'react-native-paper';
import {suggestionWordProps} from '../utils/types';

const Phrases = () => {
  const {colors} = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [isTranslateWords, setIsTranslateWords] = useState(false);
  // get suggestions words
  const suggestionWords = useMemo(() => {
    const {lastWord} = removeLastWordInPhrase(searchValue);

    if (lastWord?.length > 0) {
      return [{id: getUniqueId(), word: lastWord}];
    }
  }, [searchValue]);
  // console.log({isTranslateWords});

  const onSuggestionPress = (item: suggestionWordProps) => {
    console.log({item});
    const {newPhrase} = removeLastWordInPhrase(searchValue);

    setSearchValue(
      newPhrase +
        (newPhrase.charAt(newPhrase.length - 1) === ' ' ? '' : ' ') +
        item.word +
        ' ',
    );
  };

  return (
    <View style={{flex: 1}}>
      <SearchBar
        {...{searchValue, setSearchValue}}
        placeholder={t('writePhrase')}
        signVideoOnPress={() => setIsTranslateWords(true)}
        onSearchFocus={() => {
          setIsTranslateWords(false);
        }}
        // onSearchBlur={() => setShowSuggestions(false)}
      />

      {Array.isArray(suggestionWords) && isTranslateWords === false ? (
        <FlatList
          style={{backgroundColor: colors.surface, flex: 1}}
          data={suggestionWords}
          renderItem={({item}) => (
            <ListItem
              header={item.word}
              onPress={() => onSuggestionPress(item)}
              key={item.id}
              rightPart={<CustomeIcon name="arrow-up-left" />}
            />
          )}
        />
      ) : (
        <CustomeVideoPlayer
          words={searchValue}
          isTranslateWords={isTranslateWords}
        />
      )}
    </View>
  );
};
export default Phrases;

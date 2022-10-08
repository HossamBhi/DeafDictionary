import {t} from 'i18next';
import React, {useState, useCallback, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

import {CustomizePicker} from 'react-native-single-multi-select-fully-customized';
import CustomeIcon from '../components/common/CustomeIcon';
import SearchBar from '../components/pageHeader/SearchBar';
import Topic from '../components/words/Topic';
import {isRTL} from '../langs';
import {TopicProps, WordProps} from '../utils/types';
import Word from '../components/words/Word';
import {Diction} from '../utils/dic';
import TopicRow from '../components/words/TopicRow';

const Words = () => {
  const topics = Diction.tags;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [showTopics, setShowTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicProps>(topics[0]);
  // console.log({dummeyTopics});
  const handleChangeTopic = useCallback((item: TopicProps) => {
    console.log('selectedTopic: ', item);
    setSelectedTopic(item);
    setShowTopics(false);
  }, []);

  const topicWords: WordProps[] = useMemo(
    () =>
      Diction.words.filter(
        word =>
          word.tags.filter(tag => tag?.includes(selectedTopic?.tagtxt))
            ?.length > 0,
      ),
    [selectedTopic],
  );

  const wordsFiltered: WordProps[] = useMemo(
    () => topicWords?.filter(item => item?.word?.includes(searchValue)),
    [searchValue, topicWords],
  );

  return (
    <View style={{flex: 1}}>
      <SearchBar
        {...{searchValue, setSearchValue}}
        placeholder={t('writeWord')}
        resultNum={wordsFiltered?.length}
        originNum={topicWords?.length}
      />

      <FlatList
        data={wordsFiltered}
        ItemSeparatorComponent={() => (
          <View
            style={{height: 5, width: '100%', backgroundColor: colors.surface}}
          />
        )}
        renderItem={({item}: {item: WordProps}) => (
          <Word
            item={item}
            onPress={() =>
              navigation.navigate(
                'VideoPopup' as never,
                {videos: item.word} as never,
              )
            }
          />
        )}
        ListFooterComponent={<View style={{height: 100}} />}
        ListHeaderComponent={
          <CustomizePicker
            items={topics}
            visible={showTopics}
            onRequestClose={() => setShowTopics(false)}
            onItemPress={handleChangeTopic}
            selectedValue={selectedTopic?.tagid}
            renderPlaceholder={() => (
              <Topic item={selectedTopic} onPress={() => setShowTopics(true)} />
            )}
            renderItem={item => (
              <TopicRow
                key={item.tagid}
                item={item}
                onPress={() => handleChangeTopic(item)}
              />
            )}
            getLabel={item => item?.tagtxt}
            getValue={item => item?.tagid}
            isTopBar={true}
            showRadioButton={false}
            containerStyle={{maxHeight: '100%', height: '100%'}}
            overlayStyle={{paddingHorizontal: 0}}
            searchIcon={<CustomeIcon name="search" />}
            closeIcon={
              <CustomeIcon
                Tag={Ionicons}
                name={isRTL ? 'ios-arrow-forward' : 'ios-arrow-back'}
              />
            }
            closeSearchIcon={<CustomeIcon Tag={AntDesign} name={'close'} />}
          />
        }
      />
    </View>
  );
};
export default Words;

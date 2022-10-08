import React from 'react';
import {StyleSheet} from 'react-native';
import ListItem from '../common/ListItem';
import CustomeImage from '../common/CustomeImage';
import {TopicProps} from '../../utils/types';
import SignVideoIcon from '../common/SignVideoIcon';
import {useTheme} from 'react-native-paper';
import {WORDS_URL} from '../../utils/dic';

export const dummeyTopics = [
  {id: 1, name: 'الارقام ', words: [{name: 'اسم ما', id: 5}]},
  {id: 2, name: 'الارقام 2 ', words: [{name: 'اسم ما', id: 5}]},
];

const Topic = ({onPress, item}: {item: TopicProps; onPress: () => void}) => {
  const {colors}: any = useTheme();
  // console.log({item});
  const imageUrl = WORDS_URL + 'images/' + item.tagvcod + '/' + item.tagimgs[0];

  return (
    <ListItem
      header={item.tagtxt}
      rightPart={<CustomeImage source={{uri: imageUrl}} style={styles.image} />}
      leftPart={
        <SignVideoIcon text={item?.tagtxt || ''} />
        // <SignVideoIcon text={item.name || ''} style={{alignSelf: 'flex-end'}} />
      }
      onPress={onPress}
      style={[styles.container, {backgroundColor: colors.primary}]}
      headerStyle={styles.headeStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headeStyle: {
    flex: 1,
    fontSize: 18,
    paddingTop: 16,
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  image: {width: 150, height: 130, borderRadius: 4},
});

export default Topic;

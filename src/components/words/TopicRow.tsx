import React from 'react';
import {StyleSheet} from 'react-native';
import ListItem from '../common/ListItem';
import CustomeImage from '../common/CustomeImage';
import {TopicProps} from '../../utils/types';
import {WORDS_URL} from '../../utils/dic';

interface TopicRowProps {
  item: TopicProps;
  onPress: () => void;
}

const TopicRow = ({onPress, item}: TopicRowProps) => {
  const imageUrl = WORDS_URL + 'images/' + item.tagvcod + '/' + item.tagimgs[0];
  console.log({imageUrl});
  return (
    <ListItem
      header={item.tagtxt}
      rightPart={<CustomeImage source={{uri: imageUrl}} style={styles.image} />}
      onPress={onPress}
      style={[styles.container, {}]}
      headerStyle={styles.headeStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 0},
  headeStyle: {textAlign: 'center'},
  image: {width: 120, height: 75, borderRadius: 1},
});

export default TopicRow;

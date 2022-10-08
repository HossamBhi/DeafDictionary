import React from 'react';
import {StyleSheet} from 'react-native';
import ListItem from '../common/ListItem';
import CustomeImage from '../common/CustomeImage';
import {WordProps} from '../../utils/types';
import LikeHeart from './LikeHeart';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavAction, saveFavAction} from '../../redux/favorites';
import {WORDS_URL} from '../../utils/dic';

interface WordComponentProps {
  item: WordProps;
  onPress: () => void;
}

const Word = ({onPress, item}: WordComponentProps) => {
  const {favItems} = useSelector((state: any) => state.favorites);
  const dispatch = useDispatch();
  const handleLikeClick = () => {
    if (favItems[item.db_id]) {
      return dispatch(removeFavAction(item.db_id));
    } else {
      return dispatch(saveFavAction(item));
    }
  };
  const imageUrl = WORDS_URL + 'images/' + item.wcode + '/' + item.wordimgs[0];
  return (
    <ListItem
      header={item.word}
      rightPart={<CustomeImage source={{uri: imageUrl}} style={styles.image} />}
      leftPart={
        <LikeHeart isLike={favItems[item.db_id]} onPress={handleLikeClick} />
      }
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

export default Word;

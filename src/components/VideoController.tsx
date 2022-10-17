import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomeIcon from './common/CustomeIcon';
import OpacityButton from './common/OpacityButton';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';
import {t} from 'i18next';

interface VideoControllerProps {
  isPlaying: boolean;
  onPlayPress?: () => void;
  onStopPress?: () => void;
  onCancelPress?: () => void;
}

const VideoController: FC<VideoControllerProps> = ({
  isPlaying,
  onPlayPress,
  onStopPress,
  onCancelPress,
}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container]}>
      <OpacityButton
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={onPlayPress}
        text={isPlaying ? t('pause') : t('play')}
        textStyle={styles.text}
        icon={
          <CustomeIcon
            Tag={Ionicons}
            name={isPlaying ? 'ios-pause' : 'ios-play'}
            color="#fff"
            size={22}
          />
        }
      />
      <OpacityButton
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={onStopPress}
        icon={
          <CustomeIcon
            Tag={Ionicons}
            name={'ios-stop'}
            color="#fff"
            size={22}
          />
        }
        text={t('stop')}
        textStyle={styles.text}
      />
      <OpacityButton
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={onCancelPress}
        icon={
          <CustomeIcon Tag={Ionicons} name={'close'} color="#fff" size={22} />
        }
        text={t('cancel')}
        textStyle={styles.text}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
  },
  btn: {
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  text: {
    paddingEnd: 4,
    paddingStart: 4,
  },
});
export default VideoController;

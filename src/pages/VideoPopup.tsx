import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {ResizeMode, Video} from 'expo-av';
import {handleTextToVideo} from '../utils/APIs';
import AppLoader from '../components/common/AppLoader';
import PageHeader from '../components/pageHeader';
import CustomeText from '../components/common/CustomeText';

interface VideoPlayerProps {
  navigation: any;
  route: any;
}

const VideoPopup = ({route}: VideoPlayerProps) => {
  const video = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [videos, setVideos] = useState(route.params.videos);
  const [videoURL, setVideoURL] = useState('');
  const [videoIndex, setVideoIndex] = useState(0);
  // console.log(videos);
  useEffect(() => {
    if (!Array.isArray(videos)) {
      handleTextToVideo(videos).then(result => setVideos(result || []));
    } else {
      firstTimeLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  const firstTimeLoad = () => {
    if (videos.length > videoIndex) {
      let vurl = videos[videoIndex].video
        ? videos[videoIndex].video
        : videos[videoIndex].vpath;
      setVideoURL(vurl);
    }

    if (videos.length === 0) {
      setErrorMessage('تأكد من الاتصال بالانترنت');
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish && videos.length > videoIndex) {
      if (videos[videoIndex].video) {
        setVideoURL(videos[videoIndex].video);
      } else {
        setVideoURL(videos[videoIndex].vpath);
      }
      setVideoIndex(videoIndex + 1);
    }
  };

  const onError = (error: any) => {
    if (error.indexOf('404')) {
      setErrorMessage('تأكد من الاتصال بالانترنت');
    }
  };
  // console.log({videos, videoURL});
  return (
    <View style={{flex: 1}}>
      <PageHeader showBack />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* For render error msg */}
        {errorMessage.length > 1 ? (
          <CustomeText style={styles.errorMsg}>{errorMessage}</CustomeText>
        ) : videoURL.length < 1 ? (
          <AppLoader />
        ) : (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: videoURL,
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            onError={onError}
            shouldPlay
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1f6acd',
    paddingVertical: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  video: {
    height: 300,
    marginBottom: 50,
  },
  errorMsg: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
    lineHeight: 24,
    color: '#000',
  },
});

export default VideoPopup;

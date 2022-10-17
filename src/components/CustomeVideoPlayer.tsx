import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Video, AVPlaybackStatus, ResizeMode} from 'expo-av';
import {CustomizePicker} from 'react-native-single-multi-select-fully-customized';
import {t} from 'i18next';
import {translatorVideoProps} from '../utils/types';
import AppLoader from './common/AppLoader';
import VideoController from './VideoController';
import {handleTextToVideo} from '../utils/APIs';
import CustomeText from './common/CustomeText';
import {useTheme} from 'react-native-paper';

const dummyVideos = [
  {
    txt: 'قم',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/021035024036/1.webm',
  },
  {
    txt: 'بكتابة',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/020031/1.webm',
  },
  {
    txt: 'بكتابة',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/0220303502032/1.webm',
  },
  {
    txt: 'الجملة',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/05024023032/1.webm',
  },
  {
    txt: 'في',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/020031/1.webm',
  },
  {
    txt: 'الاعلي',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/000/1.webm',
  },
  {
    txt: 'لترجمتها',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/044/1.webm',
  },
  {
    txt: 'لترجمتها',
    vpath:
      'http://169.50.5.146/deaf_service_apps/MOI/civilregistry/res/video/02609026/1.webm',
  },
];

interface VideoPlayerProps {
  isTranslateWords: boolean;
  words?: string;
}

export default function CustomeVideoPlayer({
  words,
  isTranslateWords,
}: VideoPlayerProps) {
  const {colors} = useTheme();
  const video = useRef(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | any>({});
  const [videos, setVideos] = useState<translatorVideoProps[]>([]);
  const [selectedVideo, setSelectedVideo] =
    useState<translatorVideoProps | null>(dummyVideos[0]);
  const [videoIndex, setVideoIndex] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isTranslateWords && words) {
      clearData();
      handleTextToVideo(words).then(result => {
        setVideos(result || []);
        setSelectedVideo(result[0] || {});
        setVideoIndex(1);
      });
    } else {
      setVideos(dummyVideos);
      setSelectedVideo(dummyVideos[0]);
    }
    //  else {
    //   firstTimeLoad();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTranslateWords]);

  const clearData = useCallback(() => {
    setVideos([]);
    setSelectedVideo(null);
    setVideoIndex(1);
  }, []);
  // const firstTimeLoad = useCallback(() => {
  //   if (videos.length > videoIndex) {
  //     setSelectedVideo(videos[videoIndex]);
  //   }

  //   if (videos.length === 0) {
  //     setErrorMessage('تأكد من الاتصال بالانترنت');
  //   } else {
  //     setVideoIndex(videoIndex + 1);
  //   }
  // }, [videos, videoIndex]);

  const onPlaybackStatusUpdate = (status: any) => {
    setVideoStatus(status);

    if (status.didJustFinish && videos.length > videoIndex) {
      setSelectedVideo(videos[videoIndex]);
      setVideoIndex(videoIndex + 1);
    }
  };

  const onError = (error: any) => {
    if (error.indexOf('404')) {
      setErrorMessage('تأكد من الاتصال بالانترنت');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {errorMessage.length > 1 ? (
        <CustomeText style={[styles.errorMsg, {color: colors.text}]}>
          {errorMessage}
        </CustomeText>
      ) : !selectedVideo ? (
        <AppLoader />
      ) : (
        <>
          <CustomizePicker
            items={videos}
            onItemPress={(item, index) => {
              console.log({index});
              setSelectedVideo(item);
              setVideoIndex(index as number);
            }}
            getLabel={item => item.txt}
            getValue={item => item.vpath}
            selectedValue={selectedVideo?.vpath}
            placeholder={selectedVideo ? selectedVideo?.txt : t('selectWord')}
          />
          <Video
            ref={video}
            style={styles.video}
            source={{uri: selectedVideo.vpath}}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            onError={onError}
            shouldPlay
          />

          <VideoController
            isPlaying={videoStatus.isPlaying}
            onPlayPress={() =>
              videoStatus.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
            onStopPress={() => {
              video.current.stopAsync();
              // video.current.playAsync();
            }}
            onCancelPress={() => {
              setSelectedVideo(videos[0]);
              setVideoIndex(1);
            }}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, paddingTop: 16},
  video: {
    alignSelf: 'center',
    width: 320,
    height: 350,
    marginVertical: 16,
  },
  errorMsg: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 50,
  },
});

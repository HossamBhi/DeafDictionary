import React, {useRef, useEffect} from 'react';
import Lottie from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';

interface LikeHeartProps {
  onPress: () => void;
  isLike: boolean;
}

export default function LikeHeart({isLike, onPress}: LikeHeartProps) {
  const animation = useRef<any>(null);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      if (isLike) {
        animation?.current?.play(66, 66);
      } else {
        animation?.current?.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (isLike) {
      animation?.current?.play(19, 50);
    } else {
      animation?.current?.play(0, 19);
    }
  }, [isLike]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Lottie
        ref={animation}
        source={require('../../assets/lottie/like-animation.json')}
        autoPlay={false}
        loop={false}
        style={{width: 60, height: 60, marginEnd: -5}}
      />
    </TouchableOpacity>
  );
}

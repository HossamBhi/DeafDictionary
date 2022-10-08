import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import CustomeButton from '../common/CustomeButton';

interface ProfileImageProps {
  handlePickImage: any;
  personImage: any;
}

export default ({handlePickImage, personImage}: ProfileImageProps) => (
  <CustomeButton
    onPress={handlePickImage}
    icon={
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <View style={styles.pickProfile}>
          <Image
            source={
              !personImage
                ? require('../../assets/profile.png')
                : {uri: personImage?.uri || personImage}
            }
            // resizeMode="center"
            style={{width: 160, height: 160, borderRadius: 1000}}
          />
          <Image
            source={require('../../assets/editProfile.png')}
            style={styles.plus}
          />
        </View>
      </View>
    }
  />
);

const styles = StyleSheet.create({
  pickProfile: {
    marginTop: 10,
    marginBottom: 30,
    position: 'relative',
    borderRadius: 10000,
  },
  plus: {
    bottom: 10,
    right: 10,
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 10000,
  },
});

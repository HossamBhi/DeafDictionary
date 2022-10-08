import React, {useState} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {AntDesign} from '@expo/vector-icons';

function ImagesViewer(props: any) {
  const {navigation, route} = props;
  const images = route.params.images;
  const [imageIndex, setImageIndex] = useState(0);
  const {width, height} = useWindowDimensions();
  console.log({length: images.length});
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <AntDesign name="close" size={24} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapper}>
        <Swiper
          showsPagination={false}
          loop={false}
          onIndexChanged={(index: number) => setImageIndex(index)}>
          {Array.isArray(images) ? (
            images.map((image: any) => (
              <View key={image.id} style={[styles.slide, {width}]}>
                <Image
                  source={{uri: image.image}}
                  style={[styles.image, {width, height: height - 100}]}
                  resizeMode="contain"
                />
              </View>
            ))
          ) : (
            <View style={styles.slide}>
              <Image
                source={images}
                style={[styles.image, {width, height: height - 100}]}
                resizeMode="contain"
              />
            </View>
          )}
        </Swiper>
      </View>
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>{imageIndex + 1}</Text>
        <Text style={styles.paginationText}> / </Text>
        <Text style={styles.paginationText}>
          {images.length || 1}
          {/* {images?.length !== 0 ? images.length : 1} */}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingVertical: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    marginBottom: 10,
  },
  paginationText: {
    margin: 3,
    color: '#fff',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    // minHeight: 300,
    marginHorizontal: 10,
  },
});

export default ImagesViewer;

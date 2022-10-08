import * as ImagePicker from 'expo-image-picker';

export const getUniqueId = () => Math.floor(Math.random() * 1000000);

// image picker
export const pickImageLibrary = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.cancelled) {
    const name = result.uri.split('/').pop();
    const type = name?.split('.').pop();
    return {...result, type: 'image/' + type, name};
  }

  return null;
};

export const pickImageByCamera = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission?.granted) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const name = result.uri.split('/').pop();
      const type = name?.split('.').pop();
      return {...result, type: 'image/' + type, name};
    }
    return null;
  }
};

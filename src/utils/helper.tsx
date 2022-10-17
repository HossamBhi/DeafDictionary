import * as ImagePicker from 'expo-image-picker';

export const getUniqueId = () => Math.floor(Math.random() * 1000000);

export const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export const PASSWORD_REG =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const removeLastWordInPhrase = (phrase: string) => {
  const words = phrase.split(' ');
  const lastWord = words.pop() || '';
  console.log({words});
  return {newPhrase: words.join(' '), lastWord};
};

// image picker
function imagePickerResult(result: ImagePicker.ImagePickerResult) {
  if (result.cancelled === false) {
    const name = result.uri.split('/').pop();
    const type = name?.split('.').pop();
    return {...result, type: 'image/' + type, name};
  }
  return null;
}
export const pickImageLibrary = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  return imagePickerResult(result);
  // if (result.cancelled === false) {
  //   const name = result.uri.split('/').pop();
  //   const type = name?.split('.').pop();
  //   return {...result, type: 'image/' + type, name};
  // }

  // return null;
};

export const pickImageByCamera = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission?.granted) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    return imagePickerResult(result);

    // if (result.cancelled === false) {
    //   const name = result.uri.split('/').pop();
    //   const type = name?.split('.').pop();
    //   return {...result, type: 'image/' + type, name};
    // }
    // return null;
  }
};

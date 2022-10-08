import {t} from 'i18next';
import React, {useState, useCallback} from 'react';
import {View, StyleSheet, ImageBackground, Share, Alert} from 'react-native';
import ListItem from '../components/common/ListItem';
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {isRTL} from '../langs';
import CustomeImage from '../components/common/CustomeImage';
import {useTheme} from 'react-native-paper';
import CustomeIcon from '../components/common/CustomeIcon';
import {CustomizePicker} from 'react-native-single-multi-select-fully-customized';
import {ThemeProps, _getAppLanguages, _getAppThemes} from '../utils/appDB';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguageAction, changeThemeAction} from '../redux/appSettings';

const LeftPart = ({color}: {color: string}) => (
  <FontAwesome
    name={isRTL ? 'angle-left' : 'angle-right'}
    size={24}
    color={color}
  />
);

const More = () => {
  const {logedUser} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {activeTheme, activeLanguage} = useSelector(
    (state: any) => state.appSettings,
  );
  const {colors} = useTheme();
  const [showThemes, setShowThemes] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  console.log('logedUser: ', logedUser);
  // share app
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  // change theme
  const handleChangeTheme = useCallback(
    (item: ThemeProps) => {
      dispatch(changeThemeAction(item));
    },
    [dispatch],
  );
  // change language
  const handleChangeLanguage = useCallback(
    (item: ThemeProps) => {
      dispatch(changeLanguageAction(item));
    },
    [dispatch],
  );
  const userImage = logedUser?.image?.uri || logedUser?.image;
  return (
    <View style={{}}>
      <ImageBackground
        source={require('../assets/IslamicPattern.png')}
        resizeMode="cover"
        style={{
          paddingVertical: 25,
          borderBottomColor: '#eeeeee50',
          borderBottomWidth: 1,
        }}>
        <ListItem
          rightPart={
            <CustomeImage
              source={
                userImage ? {uri: userImage} : require('../assets/profile.png')
              }
              style={styles.profileImage}
            />
          }
          onPress={() => navigation.navigate('Profile' as never)}
          key={'Profile'}
          style={[styles.profile]}
          headerStyle={styles.profileHeader}
          header={logedUser?.name || t('profile')}
        />
      </ImageBackground>
      <ListItem
        header={t('favorites')}
        rightPart={<CustomeIcon Tag={Entypo} name="heart" />}
        leftPart={<LeftPart color={colors.text} />}
        onPress={() => navigation.navigate('Favorites' as never)}
        key={4}
        style={styles.item}
      />

      <CustomizePicker
        items={_getAppLanguages()}
        visible={showLanguages}
        onRequestClose={() => setShowLanguages(false)}
        onItemPress={handleChangeLanguage}
        selectedValue={activeLanguage?.value}
        renderPlaceholder={() => (
          <ListItem
            header={t('languages')}
            rightPart={<CustomeIcon Tag={Entypo} name="language" />}
            leftPart={<LeftPart color={colors.text} />}
            onPress={() => setShowLanguages(true)}
            key={2}
            style={styles.item}
          />
        )}
      />
      <CustomizePicker
        items={_getAppThemes()}
        visible={showThemes}
        onRequestClose={() => setShowThemes(false)}
        onItemPress={handleChangeTheme}
        selectedValue={activeTheme?.value}
        renderPlaceholder={() => (
          <ListItem
            header={t('themes')}
            rightPart={
              <CustomeIcon
                Tag={MaterialCommunityIcons}
                name="theme-light-dark"
              />
            }
            leftPart={<LeftPart color={colors.text} />}
            onPress={() => setShowThemes(true)}
            key={3}
            style={styles.item}
          />
        )}
      />
      <ListItem
        header={t('aboutProject')}
        rightPart={<CustomeIcon Tag={Entypo} name="info-with-circle" />}
        leftPart={<LeftPart color={colors.text} />}
        onPress={() => navigation.navigate('AboutProject' as never)}
        key={'aboutProject'}
        style={styles.item}
      />
      <ListItem
        header={t('aboutUs')}
        rightPart={<CustomeIcon Tag={Entypo} name="info-with-circle" />}
        leftPart={<LeftPart color={colors.text} />}
        onPress={() => navigation.navigate('AboutUs' as never)}
        key={'aboutUs'}
        style={styles.item}
      />

      <ListItem
        header={t('contactUs')}
        rightPart={<CustomeIcon Tag={Ionicons} name="call" />}
        leftPart={<LeftPart color={colors.text} />}
        onPress={() => navigation.navigate('ContactUs' as never)}
        key={1}
        style={styles.item}
      />
      <ListItem
        header={t('shareApp')}
        rightPart={<CustomeIcon Tag={Entypo} name="share" />}
        leftPart={<LeftPart color={colors.text} />}
        onPress={onShare}
        key={'shareApp'}
        style={[styles.item, {borderBottomWidth: 0}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {borderBottomWidth: 0},
  profileImage: {width: 75, height: 75, borderRadius: 1000},
  profileHeader: {paddingHorizontal: 16, fontWeight: 'bold'},
  item: {paddingVertical: 18},
});

export default More;

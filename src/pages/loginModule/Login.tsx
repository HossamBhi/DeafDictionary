import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  useWindowDimensions,
  // BackHandler,
  Alert,
} from 'react-native';
import {t} from 'i18next';
// import * as Facebook from 'expo-facebook';
// import * as Google from 'expo-auth-session/providers/google';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import CustomeButton from '../../components/common/CustomeButton';
import {postLoginAPI /* postLoginSocialMediaAPI */} from '../../utils/APIs';
import AppLoader from '../../components/common/AppLoader';
import {setLogedUserAction} from '../../redux/user';
import CustomeText from '../../components/common/CustomeText';
import SocialLogo from '../../components/loginAndRegister/SocialLogo';
import LoginErrorMessage from '../../components/loginAndRegister/LoginErrorMessage';
import Footer from '../../components/loginAndRegister/Footer';
import {StackNavigationProp} from '@react-navigation/stack';
import TextInputWithHeader from '../../components/common/TextInputWithHeader';
import {styles} from './styles';

interface LoginFields {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const dispatch = useDispatch();
  const {logedUser} = useSelector((state: any) => state.user);
  const {colors} = useTheme();
  //   const [request, response, promptAsync] = Google.useAuthRequest({
  //     iosClientId:
  //       '1040372278322-dr4vgde9m9l0kq19v44hr51nagkish2p.apps.googleusercontent.com',
  //     androidClientId:
  //       '1040372278322-umomh2b6gp8ta4l8hkco04u5g67cbhr3.apps.googleusercontent.com',
  //     expoClientId:
  //       '1040372278322-079srrqgk4k8hso32def4cspmp4o6aci.apps.googleusercontent.com',
  //   });

  const {height} = useWindowDimensions();
  const [loader, setLoaderStatus] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [values, setValues] = useState<LoginFields>({email: '', password: ''});
  // const [values, setValues] = useState({
  //   email: "omar@moakt.co",
  //   password: "12345Omar**",
  // });
  // const [values, setValues] = useState({
  //   email: "Hossambhi990@gmail.com",
  //   password: "Hossam@123",
  // });

  //   useEffect(() => {
  //     // check google response
  //     if (response?.type === 'success') {
  //       const {authentication} = response;

  //       getGoogleUserData(authentication.accessToken);
  //     }
  //   }, [response]);

  useEffect(() => {
    if (logedUser) {
      navigation.replace('TabNavigator');
    } else {
      setLoaderStatus(false);
    }

    // const unsubscribe = () => {
    //   BackHandler.addEventListener('hardwareBackPress', () => {
    //     if (route.name === 'Login') {
    //       BackHandler.exitApp();
    //       return false;
    //     }
    //     return true;
    //   });
    // };
    // return unsubscribe;
  }, [navigation, logedUser, route]);

  const createAccountSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(t('Invalid email'))
      .required(t('Required')),
    password: Yup.string().required(t('Required')),
  });

  const loginResultHandler = (result: any) => {
    setLoaderStatus(false);

    if (!result.error) {
      dispatch(setLogedUserAction(result.data));
      navigation.replace('TabNavigator');
      // set user in redux and locale storage
    } else {
      if (result.status) {
        return setValidationError(t('loginErrorMsg'));
      }
      setValidationError(result.error);
    }
  };

  const handleOnSubmit = (fieldsVal: LoginFields) => {
    setValues(fieldsVal);
    setLoaderStatus(true);
    dispatch(setLogedUserAction(fieldsVal));

    postLoginAPI(fieldsVal).then(loginResultHandler);
  };

  //   async function handelFacebookLogIn() {
  //     try {
  //       await Facebook.initializeAsync({
  //         appId: '980142965982262',
  //       });
  //       const result = await Facebook.logInWithReadPermissionsAsync({
  //         permissions: ['public_profile', 'email'],
  //       });
  //       const {type, token, expirationDate, permissions, declinedPermissions} =
  //         result;
  //       console.log('resut: ', result);
  //       if (type === 'success') {
  //         // Get the user's name using Facebook's Graph API
  //         const response = await fetch(
  //           `https://graph.facebook.com/me?fields=email,name,picture&access_token=${token}`,
  //         ).then(res => res.json());
  //         setLoaderStatus(true);
  //         postLoginSocialMediaAPI({
  //           social_id: response.id,
  //           name: response.name,
  //           email: response.email,
  //         }).then(loginResultHandler);
  //       }
  //     } catch ({message}) {
  //       alert(`Facebook Login Error: ${message}`);
  //     }
  //   }

  //   const getGoogleUserData = async token => {
  //     const userInfoRes = await fetch(
  //       'https://www.googleapis.com/userinfo/v2/me',
  //       {headers: {Authorization: `Bearer ${token}`}},
  //     )
  //       .then(res => res.json())
  //       .catch(error => alert('Google Get User Data Error'));

  //     console.log('userInfoRes: ', userInfoRes);

  //     setLoaderStatus(true);
  //     postLoginSocialMediaAPI({
  //       social_id: userInfoRes.id,
  //       name: userInfoRes.name,
  //       email: userInfoRes.email,
  //     }).then(loginResultHandler);
  //   };

  //   const handleGoogleLogIn = async () => {
  //     try {
  //       promptAsync();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  if (loader) {
    return <AppLoader />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.background}}>
      <View style={[styles.container, {minHeight: height}]}>
        <CustomeText
          style={[
            styles.pageHeader,
            {
              color: colors.primary,
              paddingBottom: validationError !== null ? 0 : 100,
            },
          ]}>
          {t('welcome')}
        </CustomeText>

        {validationError !== null && (
          <LoginErrorMessage message={validationError} />
        )}
        <Formik
          initialValues={values}
          onSubmit={handleOnSubmit}
          validationSchema={createAccountSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values: formValues,
            errors,
          }) => (
            <View>
              <TextInputWithHeader
                onChangeText={handleChange('email')}
                value={formValues.email}
                onBlur={handleBlur('email')}
                title={t('email')}
                containerStyle={[
                  styles.input,
                  errors.email && {borderColor: '#DC484B'},
                ]}
                returnKeyType="next"
                keyBoardType="email-address"
              />
              <TextInputWithHeader
                onChangeText={handleChange('password')}
                value={formValues.password}
                onBlur={handleBlur('password')}
                title={t('Password')}
                containerStyle={[
                  styles.input,
                  errors.password && {borderColor: '#DC484B'},
                ]}
                secureTextEntry={formValues.password.length > 0}
              />
              <View style={styles.footerInputs}>
                <CustomeButton
                  text={t('forgotPassword')}
                  onPress={() => navigation.navigate('ResetPass')}
                />
              </View>
              <CustomeText style={styles.socialText}>
                {t('loginSocial')}
              </CustomeText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SocialLogo
                  image={require('../../assets/google.png')}
                  //   onPress={handleGoogleLogIn}
                  onPress={() => Alert.alert('Comming Soon.')}
                />
                <SocialLogo
                  image={require('../../assets/facebook.png')}
                  //   onPress={handelFacebookLogIn}
                  onPress={() => Alert.alert('Comming Soon.')}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CustomeButton
                  style={[styles.button, {backgroundColor: colors.primary}]}
                  text={t('skip')}
                  textStyle={styles.buttonText}
                  onPress={() => navigation.navigate('TabNavigator')}
                />
                <CustomeButton
                  style={[styles.button, {backgroundColor: colors.primary}]}
                  text={t('login')}
                  textStyle={styles.buttonText}
                  onPress={handleSubmit}
                />
              </View>
              <Footer
                text={t('dontHaveAnAccount')}
                textButton={t('createNewAccount')}
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Login;

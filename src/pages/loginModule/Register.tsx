import React, {useState, useEffect} from 'react';
import {View, ScrollView, Linking, useWindowDimensions} from 'react-native';
import CustomeIcon from '../../components/common/CustomeIcon';
import {EvilIcons, Ionicons} from '@expo/vector-icons';
import {t} from 'i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomeButton from '../../components/common/CustomeButton';

import {PASSWORD_REG} from '../../utils/helper';
import {getCountriesAPI, postRegisterAPI} from '../../utils/APIs';
import AppLoader from '../../components/common/AppLoader';
import {useTheme} from '@react-navigation/native';
import LoginErrorMessage from '../../components/loginAndRegister/LoginErrorMessage';
import Footer from '../../components/loginAndRegister/Footer';
import CustomeText from '../../components/common/CustomeText';
import TextInputWithHeader from '../../components/common/TextInputWithHeader';
import {styles} from './styles';
import {CustomizePicker} from 'react-native-single-multi-select-fully-customized';
import {isRTL} from '../../langs';

interface registerFormFields {
  name: string;
  email: string;
  country_id: string;
  password: string;
  password_confirmation: string;
}
const Register = props => {
  const {navigation} = props;
  const {colors}: any = useTheme();
  const {height} = useWindowDimensions();
  const [loader, setLoaderStatus] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [values, setValues] = useState<registerFormFields>({
    name: '',
    email: '',
    country_id: '',
    password: '',
    password_confirmation: '',
  });
  // const [values, setValues] = useState({
  //   name: "Hossam Basha",
  //   email: "Hossambhi990@gmail.com",
  //   country_id: "",
  //   password: "Hossam@123",
  //   password_confirmation: "Hossam@123",
  // });

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState<any>({});

  useEffect(() => {
    getCountriesAPI().then(result => {
      // console.log('result: ', result);
      if (result.error) {
        setValidationError(result.error);
      } else {
        setCountries(result.data);
        setCountry(result.data.find(item => item.id === 65));
      }
    });
  }, []);

  const handleOnSubmit = (formValues: registerFormFields) => {
    setValues(formValues);
    setLoaderStatus(true);
    postRegisterAPI(formValues).then(result => {
      setLoaderStatus(false);
      // console.log("result: ", result);
      if (!result.error) {
        // set user in redux and locale storage
        // setUserInfoAction(result.data);
        navigation.goBack();
      } else {
        setValidationError(result.error);
      }
    });
  };
  // console.log("Country: ", country);
  const createAccountSchema = Yup.object().shape({
    name: Yup.string().required(t('Required')),
    country_id: Yup.number().required(t('Required')),
    email: Yup.string()
      .trim()
      .email(t('Invalid email'))
      .required(t('Required')),
    password: Yup.string()
      .min(8, t('Too Short!'))
      .required(t('Required'))
      .matches(PASSWORD_REG, {message: t('validationPasswordError')}),
    password_confirmation: Yup.string()
      .required(t('Required'))
      .oneOf([Yup.ref('password'), null], t('passwordsMustMatch')),
  });

  if (loader) {
    return <AppLoader />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.background}}>
      <View style={[styles.container, {minHeight: height, paddingTop: 40}]}>
        <CustomeButton
          icon={
            <CustomeIcon
              Tag={EvilIcons}
              name="close"
              size={36}
              color="#5B5A5A"
            />
          }
          onPress={() => navigation.goBack()}
        />
        <CustomeText
          style={[
            styles.pageHeader,
            {
              color: colors.primary,
              paddingBottom: validationError !== null ? 0 : 100,
            },
          ]}>
          {t('signUp')}
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
            setFieldValue,
            values: formValues,
            errors,
          }) => (
            <View>
              <>
                <TextInputWithHeader
                  onChangeText={handleChange('name')}
                  value={formValues.name}
                  onBlur={handleBlur('name')}
                  title={t('Name')}
                  containerStyle={[
                    styles.input,
                    errors.name && {borderColor: '#DC484B'},
                  ]}
                />

                <TextInputWithHeader
                  onChangeText={handleChange('email')}
                  value={formValues.email}
                  onBlur={handleBlur('email')}
                  title={t('email')}
                  keyBoardType="email-address"
                  containerStyle={[
                    styles.input,
                    errors.email && {borderColor: '#DC484B'},
                  ]}
                />
                {formValues.country_id === '' &&
                  country?.id &&
                  setFieldValue('country_id', country?.id)}

                <CustomizePicker
                  placeholderStyle={{textAlign: isRTL ? 'right' : 'left'}}
                  items={countries}
                  onItemPress={(item, itemIndex) => {
                    setFieldValue(
                      'country_id',
                      countries[itemIndex as number].id,
                    );
                  }}
                  selectedValue={
                    formValues.country_id === ''
                      ? country?.id
                      : formValues.country_id
                  }
                  getLabel={item => item?.name}
                  getValue={item => item?.id}
                  showSearch
                  isTopBar={true}
                  containerStyle={{
                    backgroundColor: colors.surface,
                    maxHeight: '100%',
                    height: '100%',
                  }}
                  overlayStyle={{paddingHorizontal: 0}}
                  placeholder={
                    countries?.length < 1
                      ? t('pickCountry')
                      : countries.find(
                          a => a.id === Number(formValues.country_id),
                        )?.name
                  }
                  containerPlaceholderStyle={[
                    styles.input,
                    errors.country_id && {borderColor: '#DC484B'},
                  ]}
                  closeIcon={
                    <CustomeIcon
                      Tag={Ionicons}
                      name={isRTL ? 'ios-arrow-forward' : 'ios-arrow-back'}
                    />
                  }
                  searchIcon={<CustomeIcon Tag={Ionicons} name="search" />}
                  closeSearchIcon={<CustomeIcon Tag={Ionicons} name="close" />}
                />
                <TextInputWithHeader
                  onChangeText={handleChange('password')}
                  value={formValues.password}
                  onBlur={handleBlur('password')}
                  title={t('Password')}
                  secureTextEntry={true}
                  containerStyle={[
                    styles.input,
                    errors.password && {borderColor: '#DC484B'},
                  ]}
                />
                {errors.password && (
                  <LoginErrorMessage
                    hideImage={true}
                    message={t('validationPasswordError')}
                    style={[
                      styles.errorMessage,
                      {backgroundColor: colors.background},
                    ]}
                    TStyle={{color: '#DC484B'}}
                  />
                )}
                <TextInputWithHeader
                  onChangeText={handleChange('password_confirmation')}
                  value={formValues.password_confirmation}
                  onBlur={handleBlur('password_confirmation')}
                  title={t('repeatPassword')}
                  secureTextEntry={true}
                  containerStyle={[
                    styles.input,
                    errors.password_confirmation && {borderColor: '#DC484B'},
                    errors.password && {marginTop: 0},
                  ]}
                />
                <CustomeButton
                  style={[styles.button, {backgroundColor: colors.primary}]}
                  text={t('signUp')}
                  textStyle={styles.buttonText}
                  onPress={handleSubmit}
                />

                <Footer
                  text={t('byTabbing')}
                  textButton={t('termsAndConfitions')}
                  onPress={() => Linking.openURL('https://icons.expo.fyi/')}
                />
              </>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Register;

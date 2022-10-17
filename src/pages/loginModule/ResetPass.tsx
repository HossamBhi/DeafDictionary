import React, {useState} from 'react';
import {View, ScrollView, useWindowDimensions} from 'react-native';
import {t} from 'i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {EvilIcons} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';

import CustomeButton from '../../components/common/CustomeButton';
import {postForgetPasswordAPI} from '../../utils/APIs';
import AppLoader from '../../components/common/AppLoader';
import CustomeIcon from '../../components/common/CustomeIcon';
import CustomeText from '../../components/common/CustomeText';
import LoginErrorMessage from '../../components/loginAndRegister/LoginErrorMessage';
import {styles} from './styles';
import TextInputWithHeader from '../../components/common/TextInputWithHeader';

const ResetPass = ({navigation}) => {
  const {colors} = useTheme();
  const {height} = useWindowDimensions();
  const [loader, setLoaderStatus] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const handleOnSubmit = values => {
    setLoaderStatus(true);
    postForgetPasswordAPI(values).then(result => {
      setLoaderStatus(false);
      // console.log("result: ", result);
      if (!result.error) {
        navigation.goBack();
      } else {
        setValidationError(result.error);
      }
    });
  };

  const createAccountSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(t('Invalid email'))
      .required(t('Required')),
  });

  if (loader) {
    return <AppLoader />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={{justifyContent: 'center'}}>
          <CustomeText
            style={[
              styles.pageHeader,
              {
                paddingTop: 80,
                color: colors.primary,
                paddingBottom: validationError !== null ? 0 : 100,
              },
            ]}>
            {t('forgetYourPass')}
          </CustomeText>
          {validationError !== null && (
            <LoginErrorMessage message={validationError} />
          )}
          <CustomeText style={styles.socialText}>{t('forgetDes')}</CustomeText>

          <Formik
            initialValues={{email: ''}}
            onSubmit={handleOnSubmit}
            validationSchema={createAccountSchema}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View>
                <TextInputWithHeader
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  title={t('email')}
                  containerStyle={[
                    styles.input,
                    errors.email && {borderColor: '#DC484B'},
                  ]}
                  keyBoardType="email-address"
                />

                <CustomeButton
                  style={[styles.button, {backgroundColor: colors.primary}]}
                  text={t('continue')}
                  textStyle={styles.buttonText}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPass;

import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import AppLoader from '../components/common/AppLoader';
import CustomeText from '../components/common/CustomeText';
import RenderHtmlComponent from '../components/common/RenderHtmlComponent';
import PageHeader from '../components/pageHeader';
import {getContactUsAPI} from '../utils/APIs';

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState(null);
  useEffect(() => {
    getContactUsAPI().then(res => {
      console.log('About: ', res);
      if (!res.error) {
        setContactDetails(res.data);
      }
    });
  }, []);

  if (contactDetails === null) {
    return <AppLoader />;
  }
  return (
    <ScrollView>
      <PageHeader text={t('contactUs')} showBack />
      <View style={{paddingHorizontal: 16}}>
        <CustomeText style={[styles.header]}>
          {contactDetails.title}
        </CustomeText>
        <RenderHtmlComponent html={contactDetails.body} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ContactUs;

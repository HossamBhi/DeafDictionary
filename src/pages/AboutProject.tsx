import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import AppLoader from '../components/common/AppLoader';
import RenderHtmlComponent from '../components/common/RenderHtmlComponent';
import PageHeader from '../components/pageHeader';
import {getContactUsAPI} from '../utils/APIs';

const AboutProject = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const {colors} = useTheme();
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
      <PageHeader text={t('aboutProject')} showBack />
      <View style={{paddingHorizontal: 16}}>
        <Text style={[styles.header, {color: colors.text}]}>
          {contactDetails.title}
        </Text>
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

export default AboutProject;

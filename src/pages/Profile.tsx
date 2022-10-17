import {NavigationProp} from '@react-navigation/native';
import {MediaLibraryPermissionResponse} from 'expo-image-picker';
import {t} from 'i18next';
import React, {FC, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BlockButton from '../components/common/BlockButton';
import CheckboxWithText from '../components/common/CheckBoxWithText';
import TextInputWithHeader from '../components/common/TextInputWithHeader';
import PageHeader from '../components/pageHeader';
import ProfileImage from '../components/profile/ProfileImage';
import {setLogedUserAction} from '../redux/user';
import {pickImageLibrary} from '../utils/helper';

interface ProfileProps {
  navigation: NavigationProp<any>;
}

const Profile: FC<ProfileProps> = ({navigation}) => {
  const {logedUser = {}} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState<MediaLibraryPermissionResponse | any>();
  console.log({logedUser});
  const [name, setName] = useState(logedUser?.name || '');
  const [phone, setPhone] = useState(logedUser?.phone || '');
  const [age, setAge] = useState(logedUser?.age || '');
  const [email, setEmail] = useState(logedUser?.email || '');
  const [job, setJob] = useState(logedUser?.job || '');
  const [enterprise, setEnterprise] = useState(logedUser?.enterprise || '');
  const [country, setCountry] = useState(logedUser?.country || '');
  const [details, setDetails] = useState(logedUser?.details || '');
  const [proposals, setProposals] = useState(logedUser?.proposals || '');
  //   checkboxs
  const [deafNoWork, setDeafNoWork] = useState(logedUser?.deafNoWork || false);
  const [deafStudent, setDeafStudent] = useState(
    logedUser?.deafStudent || false,
  );
  const [deafWork, setDeafWork] = useState(logedUser?.deafWork || false);
  const [deafParent, setDeafParent] = useState(logedUser?.deafParent || false);
  const [deafT, setdeafT] = useState(logedUser?.deafT || false);
  const [deafTeacher, setDeafTeacher] = useState(
    logedUser?.deafTeacher || false,
  );
  const [studentWToL, setStudentWToL] = useState(
    logedUser?.studentWToL || false,
  );
  const [RC, setRC] = useState(logedUser?.RC || false);
  const [RIT, setRIT] = useState(logedUser?.RIT || false);
  const [IOnly, setIOnly] = useState(logedUser?.IOnly || false);
  const [other, setOther] = useState(logedUser?.other || false);

  const handleSaveAddress = () => {
    let data = {
      name,
      phone,
      age,
      email,
      job,
      enterprise,
      country,
      details,
      proposals,
      deafNoWork,
      deafParent,
      deafStudent,
      deafWork,
      deafT,
      deafTeacher,
      RC,
      RIT,
      IOnly,
      other,
      image,
    };
    navigation.goBack();
    return dispatch(setLogedUserAction(data));
  };
  const handlePickImage = async () => setImage(await pickImageLibrary());

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1}}>
        <PageHeader text={t('profile')} showBack />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, paddingTop: 30}}
          style={{flex: 1, paddingHorizontal: 16}}>
          <ProfileImage
            handlePickImage={handlePickImage}
            personImage={image || logedUser?.image}
          />
          <TextInputWithHeader
            title={t('email')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInputWithHeader
            title={t('profileName')}
            value={name}
            onChangeText={setName}
          />

          <TextInputWithHeader
            title={t('phone')}
            value={phone}
            onChangeText={setPhone}
          />
          <TextInputWithHeader
            title={t('age')}
            value={age}
            onChangeText={setAge}
          />

          <TextInputWithHeader
            title={t('job')}
            value={job}
            onChangeText={setJob}
          />
          <TextInputWithHeader
            title={t('enterprise')}
            value={enterprise}
            onChangeText={setEnterprise}
          />
          <TextInputWithHeader
            title={t('country')}
            value={country}
            onChangeText={setCountry}
          />

          <CheckboxWithText
            text={t('deafNoWork')}
            setChecked={setDeafNoWork}
            checked={deafNoWork}
          />
          <CheckboxWithText
            text={t('deafStudent')}
            setChecked={setDeafStudent}
            checked={deafStudent}
          />
          <CheckboxWithText
            text={t('deafWork')}
            setChecked={setDeafWork}
            checked={deafWork}
          />
          <CheckboxWithText
            text={t('deafParent')}
            setChecked={setDeafParent}
            checked={deafParent}
          />
          <CheckboxWithText
            text={t('deafTranslator')}
            setChecked={setdeafT}
            checked={deafT}
          />
          <CheckboxWithText
            text={t('deafTeacher')}
            setChecked={setDeafTeacher}
            checked={deafTeacher}
          />
          <CheckboxWithText
            text={t('studentWantToLearn')}
            setChecked={setStudentWToL}
            checked={studentWToL}
          />
          <CheckboxWithText
            text={t('reperesentorCharity')}
            setChecked={setRC}
            checked={RC}
          />
          <CheckboxWithText
            text={t('reperesentorIT')}
            setChecked={setRIT}
            checked={RIT}
          />
          <CheckboxWithText
            text={t('interestedOnly')}
            setChecked={setIOnly}
            checked={IOnly}
          />
          <CheckboxWithText
            text={t('other')}
            setChecked={setOther}
            checked={other}
            style={{paddingBottom: 10}}
          />
          <TextInputWithHeader
            title={t('additionalDetails')}
            value={details}
            onChangeText={setDetails}
          />
          <TextInputWithHeader
            title={t('proposals')}
            value={proposals}
            onChangeText={setProposals}
          />
          <BlockButton
            text={t('save')}
            onPress={handleSaveAddress}
            style={{marginBottom: 20}}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;

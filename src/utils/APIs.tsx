import axios from 'axios';
import {API_URL} from '../config';

const headers = {Accept: 'application/json', lang: 'en'};

// start login module
export const postLoginSocialMediaAPI = async data =>
  await axios
    .post(`${API_URL}auth/social-login`, data)
    .then(res => res.data)
    .catch(onCatchError);

export const postRegisterAPI = async data =>
  await axios
    .post(`${API_URL}auth/register`, data)
    .then(res => res.data)
    .catch(onCatchError);

export const postLoginAPI = async ({email, password}) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  return await axios({
    url: `${API_URL}auth/login`,
    headers,
    method: 'post',
    data: data,
  })
    .then(res => res.data)
    .catch(onCatchError);
};

export const getCountriesAPI = async () =>
  await axios({url: `${API_URL}countries`, headers})
    .then(res => res.data)
    .catch(onCatchError);

export const postForgetPasswordAPI = async ({email}) =>
  await axios
    .post(`${API_URL}auth/forgot-password`, {email})
    .then(res => res.data)
    .catch(onCatchError);
// end login module

export const getContactUsAPI = async () =>
  await axios({url: `${API_URL}pages/contact`, headers, method: 'get'})
    .then(res => res.data)
    .catch(onCatchError);

export const getSignVideosOfText = async (text: string) =>
  await axios({
    url: `http://169.50.5.146/deaf_service_apps/MOI/civilregistry/services/videospell.php?val1=${text}`,
    headers,
  })
    .then(res => res.data)
    .catch(onCatchError);

export const handleTextToVideo = async (text: string) =>
  await getSignVideosOfText(text.replace(/ /g, ',')).then(videos => {
    if (videos) {
      videos = videos.substring(0, videos.length - 2);
      videos = videos.substring(1, videos.length);
      videos = JSON.parse(videos);
      return videos.videos;
    } else {
      return [];
    }
  });

const onCatchError = (error: any) => {
  console.log('on chatch error: ', error);
  if (error.response) {
    const {status, data} = error.response;
    console.log('error.response: ', error.response);
    switch (status) {
      case 404:
        return {error: 'API Error' + status};
      case 401:
        return {error: 'Unauthorized ' + status};
      case 403:
        return {error: 'Forbidden ' + status + ': ' + data.message};
      case 422:
      case 429:
        return {error: data.message, status};
      default:
        return {error: 'API Error' + status};
    }
  } else if (error.request) {
    console.log('error.request: ', error.request);
    return {error: 'Make sure about internet'};
  }
  return {error: 'Internet Error.'};
};

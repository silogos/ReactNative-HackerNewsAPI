import axios from 'axios';

const http = axios.create({
  timeout: 30000
});

http.interceptors.request.use(
  request => {
    // const token = authStore.getAccessToken();
    // if (token && token.length > 0)
    //   request.headers.Authorization = `Bearer ${token}`;
    // console.log('REQ:', request.url + ' -> ' + request.data);
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    //console.log('RESP:', response.data);
    return response;
  },
  error => {
    let { response, request } = error
    if (response) {
      const {data, status} = response;
      // The request was made and the server responded with a status code
      if (status === 401) {
        // expired token
        // NavigationService.navigate('Auth');
        // logout(false).then(() => {
        //   //alert('Session anda sudah berakhir. Silahkan login kembali'),
        // });
        return Promise.reject('[' + status + '] Unauthorized');
      } else {
        console.log('ERROR response:', data);
        let message = error.message;

        if (!!data.errorMessage) message = data.errorMessage;
        else if (typeof data === 'string' && data.length < 255) message = data;
        else if (Array.isArray(data)) {
          let message = data.map(d => d.message).join('\n');
          return Promise.reject(message);
        }
        return Promise.reject('[' + status + '] ' + message);
      }
    } else if (request) {
      // The request was made but no response was received
      return Promise.reject(
        'Ada masalah ketika menghubungi server. Silahkan cek kembali koneksi internet anda.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message);
    }
  },
);

export default http;

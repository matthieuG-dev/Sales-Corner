import axios from 'axios'

var http = axios.create({
    baseURL: 'http://localhost:1407',
    // headers: {'X-Custom-Header': 'foobar'}
    headers : {
      token: sessionStorage.getItem('token')
    }
  });

  export default http;

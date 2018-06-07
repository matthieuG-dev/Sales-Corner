import axios from 'axios'

var http = axios.create({
    baseURL: 'http://localhost:1407',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  //INTERCEPTORS
//Effectue les changements à chaque requete 
http.interceptors.request.use(
  config => {
      config.headers.token = sessionStorage.getItem('token')
      return config
  },
  error => {
      return Promise.reject(error)
})

  export default http;

import axios from 'axios'

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  //baseURL: 'https://www.totrno.com/api/',
  baseURL: 'http://127.0.0.1/api/',
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default session;

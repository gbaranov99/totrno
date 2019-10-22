import axios from 'axios'

export default axios.create({
  //baseURL: 'https://www.totrno.com/api/',
  baseURL: 'http://127.0.0.1/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
})

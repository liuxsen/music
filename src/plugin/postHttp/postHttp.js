import axios from 'axios'

export default function () {
  const token = localStorage.getItem('token')
  let instance = axios.create()
  instance.defaults.headers.common['token'] = token
  return instance
}

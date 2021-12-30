import axios from 'axios'

export default axios.create({
  baseURL: 'https://games-rental-83316-default-rtdb.europe-west1.firebasedatabase.app/'
})

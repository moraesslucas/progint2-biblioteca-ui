import axios from 'axios'

const API_URL = 'https://protected-fjord-42747.herokuapp.com/api/auth/'

class AuthService {
  login (user) {
    return axios
      .post(API_URL + 'signin', {}, {
        auth: {
          username: user.username,
          password: user.password,
        },
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
      .catch(e => {
        console.log(e)
      })
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()

import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://protected-fjord-42747.herokuapp.com/cliente/'

class ClienteService {
  buscarClientes (params) {
    const config = {
      headers: authHeader(),
      params: params,
    }

    const request = axios.get(API_URL, config)
    return request
  }

  deleteCliente (matricula) {
    return axios.delete(API_URL + matricula, { headers: authHeader() })
  }

  buscarCliente (matricula) {
    return axios.get(API_URL + matricula, { headers: authHeader() })
  }

  criarCliente (cliente) {
    return axios.post(API_URL, cliente, { headers: authHeader() })
  }

  atualizarCliente (matricula, cliente) {
    return axios.put(API_URL + matricula, cliente, { headers: authHeader() })
  }
}

export default new ClienteService()

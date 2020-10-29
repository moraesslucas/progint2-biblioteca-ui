import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://protected-fjord-42747.herokuapp.com/funcionario/'

class FuncionarioService {
  buscarFuncionarios (params) {
    const config = {
      headers: authHeader(),
      params: params,
    }

    const request = axios.get(API_URL, config)
    return request
  }

  deleteFuncionario (matricula) {
    return axios.delete(API_URL + matricula, { headers: authHeader() })
  }

  buscarFuncionario (matricula) {
    return axios.get(API_URL + matricula, { headers: authHeader() })
  }

  criarFuncionario (funcionario) {
    return axios.post(API_URL, funcionario, { headers: authHeader() })
  }

  atualizarFuncionario (matricula, funcionario) {
    return axios.put(API_URL + matricula, funcionario, { headers: authHeader() })
  }
}

export default new FuncionarioService()

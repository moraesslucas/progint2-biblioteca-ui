import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://protected-fjord-42747.herokuapp.com/emprestimo/'

class EmprestimoService {
  buscarEmprestimos (params) {
    const config = {
      headers: authHeader(),
      params: params,
    }

    const request = axios.get(API_URL, config)
    return request
  }

  deleteEmprestimo (id) {
    return axios.delete(API_URL + id, { headers: authHeader() })
  }

  criarEmprestimo (emprestimo) {
    return axios.post(API_URL, emprestimo, { headers: authHeader() })
  }
}

export default new EmprestimoService()

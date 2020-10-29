import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://protected-fjord-42747.herokuapp.com/livro/'

class LivroService {
  buscarLivros (params) {
    const config = {
      headers: authHeader(),
      params: params,
    }

    const request = axios.get(API_URL, config)
    return request
  }

  deleteLivro (id) {
    return axios.delete(API_URL + id, { headers: authHeader() })
  }

  buscarLivro (id) {
    return axios.get(API_URL + id, { headers: authHeader() })
  }

  criarLivro (livro) {
    return axios.post(API_URL, livro, { headers: authHeader() })
  }

  atualizarLivro (id, livro) {
    return axios.put(API_URL + id, livro, { headers: authHeader() })
  }
}

export default new LivroService()

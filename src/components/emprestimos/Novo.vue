<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-notification color="danger" v-for="error in validationErrors" :key="error">
          {{error.message}}
        </va-notification>
        <va-card title="Novo Empréstimo">
          <form>
            <div class="row">
              <div class="flex xs12">
                <h3 class="info">Selecionar Livro</h3>
                <va-data-table
                  :fields="livros.fields"
                  :data="livrosContent"
                  :per-page="5"
                  :totalPages="livros.totalPages"
                  @page-selected="buscaLivros"
                  :loading="livros.loading"
                  api-mode>

                  <template slot="select" slot-scope="props">
                    <va-radio-button :option="props.rowData.id" v-model="livroSelectedOption" label=" "/>
                  </template>

                </va-data-table>
              </div>
              <hr>
              <div class="flex xs12">
                <h3 class="info">Selecionar Cliente</h3>
                <va-data-table
                  :fields="clientes.fields"
                  :data="clientesContent"
                  :per-page="5"
                  :totalPages="clientes.totalPages"
                  @page-selected="buscaClientes"
                  :loading="clientes.loading"
                  api-mode>

                  <template slot="select" slot-scope="props">
                    <va-radio-button :option="props.rowData.matricula" v-model="clienteSelectedOption" label=" "/>
                  </template>
                </va-data-table>
              </div>
              <div class="flex xs12">
                <h3>Data de empréstimo</h3>
                <br/>
                <va-date-picker
                  label="Data empréstimo"
                  v-model="dataEmprestimo"/>
              </div>
              <div class="flex md12 sm12 xs12">
                <va-button :disabled="isDisabled" color="info" class="pull-right" @click="criar">
                  Criar
                </va-button>
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import LivroService from '../../services/livro.service'
import ClienteService from '../../services/cliente.service'
import EmprestimoService from '../../services/emprestimo.service'

export default {
  name: 'form-elements',
  data () {
    return {
      livros: {
        totalPages: 0,
        loading: false,
        perPage: 5,
        fields: [{
          name: '__slot:select',
          dataClass: 'text-right',
        }, {
          name: 'id',
          title: '#',
        }, {
          name: 'nome',
          title: 'Nome',
        }, {
          name: 'editora',
          title: 'Editora',
        }, {
          name: 'autor',
          title: 'Autor',
        }, {
          name: 'anoPublicacao',
          title: 'Ano de Publicação',
        }, {
          name: 'isbn',
          title: 'ISBN',
        },
        ],
      },
      clientes: {
        totalPages: 0,
        loading: false,
        perPage: 5,
        fields: [{
          name: '__slot:select',
          dataClass: 'text-right',
        }, {
          name: 'matricula',
          title: '#',
        }, {
          name: 'nome',
          title: 'Nome',
        }, {
          name: 'telefone',
          title: 'Telefone',
        }, {
          name: 'email',
          title: 'E-mail',
        },
        ],
      },
      livroSelectedOption: 0,
      clienteSelectedOption: 0,
      livrosContent: [],
      clientesContent: [],
      isDisabled: false,
      validationErrors: [],
      dataEmprestimo: '',
    }
  },
  created () {
    this.buscaLivros()
    this.buscaClientes()
    this.getToday()
  },
  methods: {
    buscaLivros (page = 0) {
      this.livros.loading = true

      const params = {
        size: this.livros.perPage,
        page: page - 1,
      }
      LivroService.buscarLivros(params)
        .then(response => {
          this.livrosContent = response.data.content
          this.livros.totalPages = response.data.totalPages
          this.livros.loading = false
        })
    },
    buscaClientes (page = 0) {
      this.clientes.loading = true
      const params = {
        size: this.clientes.perPage,
        page: page - 1,
      }
      ClienteService.buscarClientes(params)
        .then(response => {
          this.clientesContent = response.data.content
          this.clientes.totalPages = response.data.totalPages
          this.clientes.loading = false
        })
    },
    criar () {
      this.isDisabled = true

      const payload = {
        idLivro: this.livroSelectedOption,
        idCliente: this.clienteSelectedOption,
        dataEmprestimo: this.dataEmprestimo,
      }

      EmprestimoService.criarEmprestimo(payload)
        .then(response => this.$router.push({ name: 'emprestimos' }))
        .catch(error => {
          this.validationErrors = error.response.data.errors
          this.isDisabled = false
        })
    },
    getToday () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      this.dataEmprestimo = date
    },
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>

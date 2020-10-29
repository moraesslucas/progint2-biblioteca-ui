<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-notification color="danger" v-for="error in validationErrors" :key="error">
          {{error.message}}
        </va-notification>
        <va-card title="Novo Livro">
          <form>
            <div class="row">
              <div class="flex md2 sm12 xs 12">
                <p>Nome</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="livro.nome"
                  placeholder="Nome"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Editora</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="livro.editora"
                  placeholder="Editora"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Autor</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="livro.autor"
                  placeholder="Autor"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Ano de Publicação</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="livro.anoPublicacao"
                  placeholder="Ano de Publicação"
                  type="number"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>ISBN</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="livro.isbn"
                  placeholder="ISBN"
                  removable/>
              </div>
              <div class="flex md12 sm12 xs12">
                <va-button :disabled="isDisabled" color="info" class="pull-right" @click="criar">
                  Atualizar
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

export default {
  name: 'form-elements',
  data () {
    return {
      livro: {
        nome: '',
        autor: '',
        editora: '',
        anoPublicacao: '',
        isbn: '',
      },
      isDisabled: false,
      validationErrors: [],
    }
  },
  created () {
    this.readItem()
  },
  methods: {
    readItem () {
      LivroService.buscarLivro(this.$route.params.id)
        .then(response => this.livro = response.data)
        .catch(error => console.log(error))
    },
    clear (field) {
      this[field] = ''
    },
    criar () {
      this.isDisabled = true

      LivroService.atualizarLivro(this.$route.params.id, this.livro)
        .then(response => this.$router.push({ name: 'livros' }))
        .catch(error => {
          this.validationErrors = error.response.data.errors
          this.isDisabled = false
        })
    },
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>

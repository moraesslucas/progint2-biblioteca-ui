<template>
  <va-card :title="'Livros'">
    <template slot="actions">
      <va-button :to="{name: 'novo-livro'}" color="info" icon="fa fa-plus">Novo livro</va-button>
    </template>

    <va-data-table
      :fields="fields"
      :data="livros"
      :per-page="20"
      :totalPages="totalPages"
      @page-selected="readItems"
      :loading="loading"
      api-mode
    >
      <template slot="actions" slot-scope="props">
        <va-popover :message="`Editar ${props.rowData.nome}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-pencil" :to="{path: 'livro/' + props.rowData.id}"/>
        </va-popover>

        <va-popover :message="`Deletar ${props.rowData.nome}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" @click="deleteLivro(props.rowData.id)"/>
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import LivroService from '../../../services/livro.service'

export default {
  data () {
    return {
      livros: [],
      perPage: 20,
      totalPages: 0,
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
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
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  created () {
    this.readItems()
  },
  methods: {
    readItems (page = 0) {
      this.loading = true

      const params = {
        size: this.perPage,
        page: page - 1,
      }
      LivroService.buscarLivros(params)
        .then(response => {
          this.livros = response.data.content
          this.totalPages = response.data.totalPages
          this.loading = false
        })
    },
    deleteLivro (id) {
      LivroService.deleteLivro(id)
        .then(response => {
          this.livros = this.livros.filter(item => item.id !== id)
        })
    },
  },
}
</script>

<style lang="scss">
</style>

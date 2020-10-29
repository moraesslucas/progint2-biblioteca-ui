<template>
  <va-card :title="'Funcionários'">
    <template slot="actions">
      <va-button :to="{name: 'novo-funcionario'}" color="info" icon="fa fa-plus">Novo funcionário</va-button>
    </template>

    <va-data-table
      :fields="fields"
      :data="funcionarios"
      :per-page="20"
      :totalPages="totalPages"
      @page-selected="readItems"
      :loading="loading"
      api-mode
    >
      <template slot="actions" slot-scope="props">
        <va-popover :message="`Editar ${props.rowData.nome}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-pencil" :to="{path: 'funcionario/' + props.rowData.matricula}"/>
        </va-popover>

        <va-popover :message="`Deletar ${props.rowData.nome}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" @click="deleteFuncionario(props.rowData.matricula)"/>
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import FuncionarioService from '../../../services/funcionario.service'

export default {
  data () {
    return {
      funcionarios: [],
      perPage: 20,
      totalPages: 0,
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'matricula',
        title: '#',
      }, {
        name: 'nome',
        title: 'Nome',
      }, {
        name: 'telefone',
        title: 'Telefone',
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
      FuncionarioService.buscarFuncionarios(params)
        .then(response => {
          this.funcionarios = response.data.content
          this.totalPages = response.data.totalPages
          this.loading = false
        })
    },
    deleteFuncionario (matricula) {
      FuncionarioService.deleteFuncionario(matricula)
        .then(response => {
          this.funcionarios = this.funcionarios.filter(item => item.matricula !== matricula)
        })
    },
  },
}
</script>

<style lang="scss">
</style>

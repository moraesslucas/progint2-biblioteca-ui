<template>
  <va-card :title="'Empréstimos'">
    <template slot="actions">
      <va-toggle v-model="mode" label="Somente ativos" @input="busca()"/>
      <va-button :to="{name: 'novo-emprestimo'}" color="info" icon="fa fa-plus">Novo empréstimo</va-button>
    </template>

    <va-data-table
      :fields="fields"
      :data="emprestimos"
      :per-page="20"
      :totalPages="totalPages"
      @page-selected="busca"
      :loading="loading"
      api-mode
    >
      <template slot="actions" slot-scope="props">
        <va-popover v-if="mode" :message="`Realizar devolução do empréstimo #${props.rowData.id}`" placement="left">
          <va-button flat small color="gray" icon="fa fa-mail-forward" @click="deleteLivro(props.rowData.id)"/>
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import EmprestimoService from '../../../services/emprestimo.service'

export default {
  data () {
    return {
      emprestimos: [],
      perPage: 20,
      totalPages: 0,
      mode: true,
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'id',
        title: '#',
      }, {
        name: 'livro.nome',
        title: 'Nome do Livro',
      }, {
        name: 'cliente.nome',
        title: 'Nome do Cliente',
      }, {
        name: 'dataEmprestimo',
        title: 'Data do Empréstimo',
      }, {
        name: 'dataPrevistaEntrega',
        title: 'Data Prevista de Devolução',
      }, {
        name: 'dataEfetivaEntrega',
        title: 'Data Efetiva de Devolução',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  created () {
    this.busca()
  },
  methods: {
    busca (page = 0) {
      this.loading = true

      const params = {
        size: this.perPage,
        page: page - 1,
        ativo: this.mode,
        sort: 'id,asc',
      }

      EmprestimoService.buscarEmprestimos(params)
        .then(response => {
          this.emprestimos = response.data.content
          this.totalPages = response.data.totalPages
          this.loading = false
          console.log(this.loading)
        })
    },
    deleteLivro (id) {
      EmprestimoService.deleteEmprestimo(id)
        .then(response => {
          if (this.mode == 1) {
            this.emprestimos = this.emprestimos.filter(item => item.id !== id)
          }
        })
    },
  },
}
</script>

<style lang="scss">
</style>

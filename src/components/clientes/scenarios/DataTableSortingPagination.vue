<template>
  <va-card title="Clientes">
    <template slot="actions">
      <va-button :to="{name:'novo-cliente'}" color="info" icon="fa fa-plus">Novo cliente</va-button>
    </template>

    <va-data-table
      :fields="fields"
      :data="clientes"
      :per-page="20"
      :totalPages="totalPages"
      @page-selected="readItems"
      :loading="loading"
      api-mode
    >
      <template slot="actions" slot-scope="props">
        <va-popover :message="`Editar ${props.rowData.nome}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-pencil" :to="{path: 'cliente/' + props.rowData.matricula}"/>
        </va-popover>

        <va-popover :message="`Deletar ${props.rowData.nome}`" placement="top">
          <va-button flat small
            color="gray"
            icon="fa fa-trash"
            @click="deleteCliente(props.rowData.matricula)"
          />
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import ClienteService from '../../../services/cliente.service'

export default {
  data () {
    return {
      clientes: [],
      perPage: 20,
      totalPages: 0,
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'matricula',
        title: 'Matrícula',
      }, {
        name: 'nome',
        title: 'Nome',
      }, {
        name: 'telefone',
        title: 'Telefone',
      }, {
        name: 'email',
        title: 'E-mail',
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
      ClienteService.buscarClientes(params).then(response => {
        this.clientes = response.data.content
        this.totalPages = response.data.totalPages
        this.loading = false
      })
    },
    deleteCliente (matricula) {
      ClienteService.deleteCliente(matricula).then(response => {
        this.clientes = this.clientes.filter(item => item.matricula !== matricula)
      })
    },
  },
}
</script>

<style lang="scss">
</style>

<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-notification color="danger" v-for="error in validationErrors" :key="error">
          {{error.message}}
        </va-notification>
        <va-card title="Novo Cliente">
          <form>
            <div class="row">
              <div class="flex md2 sm12 xs 12">
                <p>Nome</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="cliente.nome"
                  placeholder="Nome"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Telefone</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="cliente.telefone"
                  placeholder="Telefone"
                  removable
                  v-mask="['(##) #####-####', '(##) ####-####']"/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>E-mail</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  type="email"
                  v-model="cliente.email"
                  placeholder="E-mail"
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
import ClienteService from '../../services/cliente.service'
import { mask } from 'vue-the-mask'

export default {
  name: 'form-elements',
  directives: { mask },
  data () {
    return {
      cliente: {
        nome: '',
        telefone: '',
        email: '',
      },
      validationErrors: [],
      isDisabled: false,
    }
  },
  created () {
    this.readItem()
  },
  methods: {
    readItem () {
      ClienteService.buscarCliente(this.$route.params.matricula)
        .then(response => this.cliente = response.data)
        .catch(error => console.log(error))
    },
    clear (field) {
      this[field] = ''
    },
    criar () {
      this.isDisabled = true

      ClienteService.atualizarCliente(this.$route.params.matricula, this.cliente)
        .then(response => this.$router.push({ name: 'clientes' }))
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

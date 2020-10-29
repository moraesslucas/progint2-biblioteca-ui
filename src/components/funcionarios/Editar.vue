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
                  v-model="funcionario.nome"
                  placeholder="Nome"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Telefone</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="funcionario.telefone"
                  placeholder="Telefone"
                  removable
                  v-mask="['(##) #####-####', '(##) ####-####']"/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Senha (Deixe em branco para não alterar)</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="funcionario.senha"
                  placeholder="Senha"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Confirmar senha</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="confirmaSenha"
                  placeholder="Confirmar senha"
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
import FuncionarioService from '../../services/funcionario.service'
import { mask } from 'vue-the-mask'

export default {
  name: 'form-elements',
  directives: { mask },
  data () {
    return {
      funcionario: {
        nome: '',
        telefone: '',
        senha: '',
      },
      confirmaSenha: '',
      isDisabled: false,
      validationErrors: [],
    }
  },
  created () {
    this.readItem()
  },
  methods: {
    readItem () {
      FuncionarioService.buscarFuncionario(this.$route.params.matricula)
        .then(response => this.funcionario = response.data)
        .catch(error => console.log(error))
    },
    clear (field) {
      this[field] = ''
    },
    criar () {
      this.isDisabled = true
      if (this.funcionario.senha != null && this.confirmaSenha != this.funcionario.senha) {
        this.validationErrors = [{ message: 'Senha não bate com a confirmação' }]
        this.isDisabled = false
      } else {
        FuncionarioService.atualizarFuncionario(this.$route.params.matricula, this.funcionario)
          .then(response => this.$router.push({ name: 'funcionarios' }))
          .catch(error => {
            this.validationErrors = error.response.data.errors
            this.isDisabled = false
          })
      }
    },
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>

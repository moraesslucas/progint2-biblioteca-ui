<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-notification color="danger" v-for="error in validationErrors" :key="error">
          {{error.message}}
        </va-notification>
        <va-card title="Novo Funcionário">
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
                  placeholder="Editora"
                  removable
                  v-mask="['(##) #####-####', '(##) ####-####']"/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Senha</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="funcionario.senha"
                  placeholder="Autor"
                  removable/>
              </div>
              <div class="flex md2 sm12 xs 12">
                <p>Confirmação de senha</p>
              </div>
              <div class="flex md10 sm12 xs12">
                <va-input
                  v-model="confirmaSenha"
                  placeholder="Confirmação de senha"
                  removable/>
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
  methods: {
    clear (field) {
      this[field] = ''
    },
    criar () {
      this.isDisabled = true
      if (this.funcionario.senha != this.confirmaSenha) {
        this.validationErrors = [{ message: 'Senha não bate com a confirmação' }]
        this.isDisabled = false
      } else {
        FuncionarioService.criarFuncionario(this.funcionario)
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

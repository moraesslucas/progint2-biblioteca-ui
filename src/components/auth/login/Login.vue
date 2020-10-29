<template>
  <form @submit.prevent="onsubmit">
    <va-notification color="danger" v-if="message" :key="error">
      {{message}}
    </va-notification>
    <br/>
    <va-input
      v-model="matricula"
      label="Matrícula"
      :error="!!matriculaErrors.length"
      :error-messages="matriculaErrors"
    />

    <va-input
      v-model="password"
      type="password"
      label="Senha"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button v-if="!loading" type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
      <breeding-rhombus-spinner
        v-if="loading"
        :animation-duration="2000"
        :size="20"
        :color="this.$themes.primary"/>
    </div>
  </form>
</template>

<script>
import AuthService from '../../../services/auth.service'
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
  name: 'login',
  components: {
    BreedingRhombusSpinner,
  },
  data () {
    return {
      matricula: '',
      password: '',
      keepLoggedIn: false,
      matriculaErrors: [],
      passwordErrors: [],
      message: '',
      loading: false,
    }
  },
  computed: {
    formReady () {
      return !this.matriculaErrors.length && !this.passwordErrors.length
    },
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created () {
    if (this.loggedIn) {
      this.$router.push({ name: 'livros' })
    }
  },
  methods: {
    onsubmit () {
      this.loading = true

      this.matriculaErrors = this.matricula ? [] : ['Matrícula é obrigatório!']
      this.passwordErrors = this.password ? [] : ['A senha é obrigatória!']
      if (!this.formReady) {
        return
      }

      this.$store.dispatch('auth/login', { username: this.matricula, password: this.password }).then(
        () => {
          this.$router.push({ name: 'clientes' })
        },
        error => {
          this.loading = false
          this.message = "Erro no login, valide as credenciais e tente novamente."
        },
      )
    },
  },
}
</script>

<style lang="scss">
</style>

import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    {
      path: '*',
      redirect: { name: 'login' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
          default: true,
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'livros',
          path: 'livros',
          component: () => import('../components/livros/Livros.vue'),
          default: true,
        },
        {
          name: 'editar-livro',
          path: 'livro/:id',
          component: () => import('../components/livros/Editar.vue'),
          default: false,
        },
        {
          name: 'novo-livro',
          path: 'novo-livro',
          component: () => import('../components/livros/Novo.vue'),
          default: false,
        },
        {
          name: 'clientes',
          path: 'clientes',
          component: () => import('../components/clientes/Clientes.vue'),
          default: false,
        },
        {
          name: 'editar-cliente',
          path: 'cliente/:matricula',
          component: () => import('../components/clientes/Editar.vue'),
          default: false,
        },
        {
          name: 'novo-cliente',
          path: 'novo-cliente',
          component: () => import('../components/clientes/Novo.vue'),
          default: false,
        },
        {
          name: 'funcionarios',
          path: 'funcionarios',
          component: () => import('../components/funcionarios/Funcionarios.vue'),
          default: false,
        },
        {
          name: 'editar-funcionario',
          path: 'funcionario/:matricula',
          component: () => import('../components/funcionarios/Editar.vue'),
          default: false,
        },
        {
          name: 'novo-funcionario',
          path: 'novo-funcionario',
          component: () => import('../components/funcionarios/Novo.vue'),
          default: false,
        },
        {
          name: 'emprestimos',
          path: 'emprestimos',
          component: () => import('../components/emprestimos/Emprestimos.vue'),
          default: false,
        },
        {
          name: 'novo-emprestimo',
          path: 'novo-emprestimo',
          component: () => import('../components/emprestimos/Novo.vue'),
          default: false,
        },
      ],
    },
  ],
})

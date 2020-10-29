export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'livros',
      displayName: 'Livros',
      meta: {
        iconClass: 'fa fa-book',
      },
    },
    {
      name: 'clientes',
      displayName: 'Clientes',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-user',
      },
    },
    {
      name: 'funcionarios',
      displayName: 'Funcionários',
      meta: {
        iconClass: 'fa fa-user-secret',
      },
    },
    {
      name: 'emprestimos',
      displayName: 'Empréstimos',
      meta: {
        iconClass: 'fa fa-address-card',
      },
    },
  ],
}

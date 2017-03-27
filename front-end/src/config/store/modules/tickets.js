const state = {
  all: [
    {
      cod: '000230',
      cat: 'Dúvida',
      prod: 'General War',
      createdAt: '01/01/2015',
      updatedAt: '01/02/2015',
      associated: 'Marcus',
      status: 'Aberto',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      comments: []
    },
    {
      cod: '000231',
      cat: 'Dúvida',
      prod: 'Outros',
      createdAt: '03/09/2015',
      updatedAt: '',
      associated: 'Marcus',
      status: 'Aberto',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      comments: []
    },
    {
      cod: '000232',
      cat: 'Conta violada',
      prod: 'General War',
      createdAt: '01/09/2015',
      updatedAt: '03/09/2015',
      associated: 'José',
      status: 'Aguardando',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      comments: []
    },
    {
      cod: '000233',
      cat: 'Reembolso',
      prod: 'Barbarians',
      createdAt: '25/08/2015',
      updatedAt: '27/08/2015',
      associated: 'Pedro',
      status: 'Fechado',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      comments: []
    }
  ]
}

const getters = {
  allTickets: (state) => state.all,
  Ticket: (state) => (cod) => {
    return state.all.find((item) => {
      return item.cod === cod;
    })
  }
}

const mutations = {
  addTicket (state, payload) {
    state.all.push(payload);
  }
}

const actions = {
  doAddTickets ({state, commit}, ticket) {
    return new Promise((resolve, reject) => {
      commit('addTicket', ticket);
      resolve();
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

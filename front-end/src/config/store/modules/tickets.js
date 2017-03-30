const state = {
  all: []
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
  },
  updateTicket (state, payload) {
    let i = 0;
    state.all.map((item) => {
      if (item._id === payload._id) {
        state.all[i] = payload;
      }
      i++;
    })
  }
}

const actions = {
  doAddTickets ({state, commit}, ticket) {
    return new Promise((resolve, reject) => {
      commit('addTicket', ticket);
      resolve();
    })
  },
  doUpdateTicket ({state, commit}, ticket) {
    return new Promise((resolve, reject) => {
      commit('updateTicket', ticket);
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

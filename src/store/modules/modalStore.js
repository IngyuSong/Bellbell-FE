const state = {
  showModal: false,
};

const mutations = {
  setShowModal(state, value) {
    state.showModal = value;
  },
};

const actions = {
  openModal({commit}) {
    commit('setShowModal', true);
  },
  closeModal({commit}) {
    commit('setShowModal', false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

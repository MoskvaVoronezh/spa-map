import Vue from "vue";
import Vuex from "vuex";
import cards from '@/store/modules/cards.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cards,
  },
  state: {},
  mutations: {},
  actions: {},
});

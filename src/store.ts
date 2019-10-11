import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const types = {
  SAVE: 'SAVE'
};

interface ISave {
  name: string
  val: any
}

const mutations: any = {
  [types.SAVE](state: any, {name, val}: ISave) {
    state.data[name] = val;
  }
};

export default new Vuex.Store({
  state: {
    data: {},

  },
  mutations: mutations,
  actions: {},
});

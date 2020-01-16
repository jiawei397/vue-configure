import {types} from '@/enum';

interface ISave {
  name: string;
  val: any;
}

const mutations: any = {
  [types.SAVE](state: any, {name, val}: ISave) {
    state.data[name] = val;
  },
  [types.SET_CURRENT_TAB](state: any, name: string) {
    state.currentTab = name;
  },
  [types.SET_CURRENT_DATA](state: any, data: object) {
    state.currentData = data;
  },
};

const actions = {
  [types.SAVE]({commit, state}: any) {
    commit(types.SAVE, {
      name: state.currentTab,
      val: state.currentData,
    });
  },
};

export default {
  namespaced: true,
  state: {
    data: {},
    currentTab: '', // 当前tab标签名称
    currentData: {},
  },
  mutations,
  actions,
};

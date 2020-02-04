import {types} from '@/enum';

interface IItem {
  name: string;
  serverDir: string;
  realPath: string;
  localDir: string;
  version: string;
}

const originData: IItem[] = [{
  name: 'John Brown',
  serverDir: 'bb',
  realPath: 'http://www.baidu.com',
  localDir: 'aa',
  version: 'v1'
}, {
  name: 'aa',
  serverDir: 'http://aa.com',
  realPath: 'http://www.baidu1.com',
  localDir: 'c://localDir1',
  version: 'v12'
}, {
  name: 'bb',
  serverDir: 'http://aa.com',
  realPath: 'http://www.baidu2.com',
  localDir: 'c://localDir2',
  version: 'v13'
}, {
  name: 'cc',
  serverDir: 'http://aa.com',
  realPath: 'http://www.baidu3.com',
  localDir: 'c://localDir3',
  version: 'v14'
}];

const mutations: any = {
  [types.ADD](state: any, obj: IItem) {
    state.current = obj;
    state.data.push(obj);
  }
};

const getters = {
  data: (state: any) => state.data,
  originData: () => originData
};

export default {
  namespaced: true,
  state: {
    data: [...originData],
    current: {}
  },
  mutations,
  getters
};

import {types} from '@/enum';
import {success} from '@/utils/msg';

interface ISave {
  name: string;
  val: any;
}

const originData: object[] = [
  {tab: 'others', type: 'title', style: 'title2', caption: '设定'},
  {// 开启前台调试模式
    tab: 'others',
    group: '_system',
    level: 'top',
    name: 'debugJs',
    uinvInterface: 'debugJs',
    caption: '开启前台调试模式',
    type: 'bool',
    defaultValue: true
  },
  {// 是否弹提示框
    tab: 'others',
    group: '_system',
    level: 'top',
    name: 'isShowAlert',
    uinvInterface: 'isShowAlert',
    caption: '是否弹提示框',
    type: 'bool',
    defaultValue: false
  },
  {tab: 'others', type: 'title', style: 'title2', caption: '其它'},
// {tab:"others",   group : "_system", level : "top", name:"isKeepCaptionUnique", uinvInterface:"isKeepCaptionUnique",caption:i18n("标题是否唯一"), type:"bool", defaultValue:false },
  {// 3D换肤
    tab: 'others',
    group: '_system',
    level: 'top',
    itemkey: '',
    name: 'skinType',
    uinvInterface: 'skinType',
    caption: '换肤',
    type: 'string',
    defaultValue: 'default'
  },
  {
    name: 'numberTest',
    type: 'number',
    caption: '数字',
    defaultValue: 22,
    desc: ''
  },
  {
    name: 'textareaTest',
    type: 'textarea',
    caption: '多行文本',
    defaultValue: '醉里乾坤大',
    desc: ''
  },
  {
    name: 'selectTest',
    type: 'select',
    caption: 'select',
    allowCreate: true,
    items: [
      {
        hideName: 0,
        showName: '中国'
      },
      {
        hideName: 1,
        showName: '测试'
      },
      {
        hideName: 2,
        showName: '测试2'
      }
    ],
    defaultValue: 1
  },
  {
    name: 'colorTest',
    type: 'color',
    caption: '颜色',
    defaultValue: '#2D8CF0',
    desc: ''
  },
  {tab: 'others', type: 'title', style: 'title2', caption: '列表'},
  {
    name: 'list',
    caption: '列表（输入框-字符串）',
    type: 'listEditor',
    listType: 'text',
    textValue: '',
    tips: '名称列表',
    defaultValue: ['aa', 'bb']
  }
];

const state = {
  originData,
  data: {},
  currentTab: '', // 当前tab标签名称
  currentData: {}
};

const getters = {
  originData: (state: any) => state.originData,
  currentData: (state: any) => state.currentData,
  currentTab: (state: any) => state.currentTab
};


const mutations: any = {
  [types.SAVE](state: any, {name, val}: ISave) {
    state.data[name] = val;
  },
  [types.SET_CURRENT_TAB](state: any, name: string) {
    state.currentTab = name;
  },
  [types.SET_CURRENT_DATA](state: any, data: object) {
    state.currentData = data;
  }
};

const actions = {
  [types.SAVE]({commit, state}: any) {
    commit(types.SAVE, {
      name: state.currentTab,
      val: state.currentData
    });
    success('提交成功！');
  }
};

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
};

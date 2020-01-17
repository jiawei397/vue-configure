<template>
  <div id="app">
    <Tabs class="tabs" type="card" @on-click="changeCurData">
      <template v-for="item in data">
        <TabPane :label="item.caption" :name="item.name">
        </TabPane>
      </template>
      <Button @click="save" icon="ios-share" type="default" slot="extra">保存</Button>
    </Tabs>
    <Tabs class="tab" @on-click="change" :name="curTab" ref="tabs">
      <template v-for="item in curTabData">
        <TabPane :label="item.caption" :name="item.name" :tab="curTab">
          <template v-if="item.name=='basic'">
            <basic></basic>
          </template>
          <template v-else-if="item.name=='resource'">
            <resource></resource>
          </template>
          <template v-else-if="item.name=='selector'">
            <selector></selector>
          </template>
          <template v-else>
            {{item.caption}}
          </template>
        </TabPane>
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {types} from './enum';
import Basic from './views/system/Basic.vue';
import Resource from './views/system/Resource.vue';
import Selector from './views/system/Selector.vue';

interface IChild {
  name: string;
  caption: string;
}

export default Vue.extend({
  data() {
    const data = [
      {
        name: 'system',
        caption: '系统',
        children: [{
          name: 'basic',
          caption: '基本'
        }, {
          name: 'resource',
          caption: '资源'
        }, {
          name: 'selector',
          caption: '选择器'
        }]
      },
      {
        name: 'func',
        caption: '系统',
        children: [{
          name: 'layer',
          caption: '图层对象'
        }, {
          name: 'menu',
          caption: '面板'
        }, {
          name: 'monitor',
          caption: '监控报警'
        }]
      },
      {
        name: 'exhibition',
        caption: '展示',
        children: [{
          name: 'viewpoint',
          caption: '视角'
        }, {
          name: '3d',
          caption: '3D效果'
        }, {
          name: 'alarm-color',
          caption: '告警颜色'
        }]
      }
    ];
    return {
      curTab: '',
      curTabData: [] as IChild[],
      data
    };
  },
  components: {
    Basic,
    Resource,
    Selector
  },
  methods: {
    changeCurData(name: string) {
      let index = this.data.findIndex((item) => {
        return item.name === name;
      });
      if (index !== -1) {
        this.changeCurDataByIndex(index);
      }
    },
    changeCurDataByIndex(index: number) {
      const curTabData = this.data[index].children;
      if (!curTabData || curTabData.length === 0) {
        return;
      }
      this.curTabData = curTabData;
      this.curTab = curTabData[0].name;
      (this.$refs.tabs as any).activeKey = this.curTab; // 激活第1个tab页
    },
    change(name: string) {
      this.$store.commit(types.SET_CURRENT_TAB, name);
    },
    save() {
      // this[types.SAVE]({name:'jw',val:123});
      // this.$store.commit(types.SAVE, {name:'jw',val:123});
      this.$store.dispatch(types.SAVE);
    }
    // ...mapMutations([types.SAVE])
  },
  mounted() {
    this.changeCurDataByIndex(0);
    this.change(this.curTab);
  }
});
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .tabs {
    height: 36px;
  }
</style>

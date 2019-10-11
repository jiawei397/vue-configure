<template>
  <div id="app">
    <Tabs class="tabs" type="card" @on-click="click">
      <TabPane label="系统" name="system"></TabPane>
      <TabPane label="功能" name="func">功能</TabPane>
      <TabPane label="展示" name="exhibition">展示</TabPane>
      <Button @click="save" icon="ios-download-outline" type="primary" slot="extra">保存</Button>
    </Tabs>
    <router-view/>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import {types} from "./store";

  export default {
    data () {
      return {};
    },
    methods: {
      click (name) {
        location.hash = '#/' + name;
      },
      save () {
        this[types.SAVE]({name:'jw',val:123});
        // this.$store.commit(types.SAVE, {name:'jw',val:123});
      },
      ...mapMutations([types.SAVE])
    }
  }
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

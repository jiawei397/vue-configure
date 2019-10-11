<template>
  <Tabs class="tab" @on-click="change" name="system">
    <TabPane label="基本" name="basic" tab="system">
      <basic></basic>
    </TabPane>
    <TabPane label="资源" name="resource" tab="system"></TabPane>
    <TabPane label="选择器" name="selector" tab="system"></TabPane>
  </Tabs>
</template>
<script lang="ts">
  import Basic from './Basic.vue';
  import {types} from "../../store";

  // const data = {
  //   'system':[{
  //     name:'basic',
  //     caption:'基本'
  //   },{
  //     name:'resource',
  //     caption:'资源'
  //   },{
  //     name:'selector',
  //     caption:'选择器'
  //   },]
  // };

  export default {
    name: 'System',
    components: {
      Basic,
    },
    // data
    methods: {
      change(name: string) {
        // console.log(name);
        this.$store.commit(types.SET_CURRENT_TAB, name);
      }
    },
    mounted(){
      this.$store.commit(types.SET_CURRENT_TAB, 'basic');
    }
  };
</script>

<style>
  /*.tab {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/
</style>

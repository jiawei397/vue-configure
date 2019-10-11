<template>
  <Tabs class="tab" @on-click="change" :name="tab">
    <template v-for="item in data">
      <TabPane :label="item.caption" :name="item.name" :tab="tab">
        <template v-if="item.name=='basic'">
          <basic></basic>
        </template>
        <template v-else>
          {{item.caption}}
        </template>
      </TabPane>
    </template>
  </Tabs>
</template>
<script lang="ts">
  import Basic from './Basic.vue';
  import {types} from "../../store";

  export default {
    name: 'System',
    components: {
      Basic,
    },
    data() {
      const data = [{
        name: 'basic',
        caption: '基本'
      }, {
        name: 'resource',
        caption: '资源'
      }, {
        name: 'selector',
        caption: '选择器'
      }];

      return {
        tab: 'system',
        current: data[0].name,
        data
      }
    },
    methods: {
      change(name: string) {
        // console.log(name);
        this.$store.commit(types.SET_CURRENT_TAB, name);
      }
    },
    mounted() {
      this.$store.commit(types.SET_CURRENT_TAB, this.current);
    }
  };
</script>

<style>
  .content {
    width: 100%;
    /*margin-top: -20px;*/
  }
</style>

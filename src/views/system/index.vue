<template>
  <Tabs class="tab">
    <TabPane label="基本" name="a" tab="system">
      <basic></basic>
    </TabPane>
    <TabPane label="资源" name="b" tab="system"></TabPane>
    <TabPane label="选择器" name="c" tab="system"></TabPane>
  </Tabs>
</template>
<script lang="ts">
import Basic from './Basic.vue';
export default {
  name: 'System',
  components: {
    Basic,
  },
};
</script>

<style>
  .tab{
    height: 100%;
  }
</style>

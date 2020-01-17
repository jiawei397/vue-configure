<template>
    <i-select v-model="props.defaultValue" size="large" clearable :filterable="true" :allow-create="props.allowCreate" placement="top">
      <Option v-for="item in props.items" :value="item.hideName">{{ item.showName }}</Option>
    </i-Select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ISelect {
  name: string;
  caption: string;
  defaultValue: string | number;
  type: string;
  items: [any];
  allowCreate: boolean; // 是否支持创建新的
}

@Component
export default class Select extends Vue {
  @Prop() private props: ISelect;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

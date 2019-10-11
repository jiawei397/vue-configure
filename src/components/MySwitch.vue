<template>
  <FormItem class="form-item my-form-item" :label="props.caption">
    <i-switch class="switch" :prop="props.name" v-model="props.defaultValue" size="large">
    </i-switch>
  </FormItem>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MySwitch extends Vue {
  @Prop() private props: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .my-form-item{
    margin-left 20px
    width 400px
  }
</style>

<template>
  <FormItem class="form-item" :label="caption">
    <i-switch class="switch" :name="name" v-model="val" size="large">
    </i-switch>
  </FormItem>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Switch extends Vue {
  @Prop() private caption: string;
  @Prop() private val: string;
  @Prop() private name: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .switch {
    margin-left -1050px
  }
</style>

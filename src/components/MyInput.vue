<template>
  <FormItem class="form-item my-form-item" :label="props.caption">
    <i-input :prop="props.name" v-model="props.defaultValue" size="large" clearable="true">
    </i-input>
  </FormItem>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MyInput extends Vue {
  @Prop() private props: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .my-form-item{
    margin-left 20px
    width 550px
  }
</style>

<template>
  <FormItem class="form-item my-form-item" :label="props.caption">
    <i-input class="input" :prop="props.name" v-model="props.defaultValue" size="large" clearable="true">
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

  .input {
    height: 30px;
    width: 240px;
    line-height: 30px;
    background: #fff;
    border: solid 1px #e5e5e5;
    font-size: 12px;
    padding-left: 10px;
    border-radius: 2px
  }
</style>

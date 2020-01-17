<template>
    <i-input :type="props.type==='string'?'text':props.type" :prop="props.name" v-model.trim="props.defaultValue"
             size="large" :clearable="true" :rows="4">
      <!--@on-blur="blur"-->
      <!--@on-keypress="keypress"-->
    </i-input>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  interface IInput {
    name: string;
    caption: string;
    defaultValue: string | number;
    type: string;
  }

  @Component
  export default class Input extends Vue {
    @Prop() private props: IInput;
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>

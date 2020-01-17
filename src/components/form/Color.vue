<template>
    <ColorPicker :name="props.name" v-model="props.defaultValue" size="large">
    </ColorPicker>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  interface IColor {
    name: string;
    caption: string;
    defaultValue: string;
  }

  @Component
  export default class Color extends Vue {
    @Prop() private props: IColor;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

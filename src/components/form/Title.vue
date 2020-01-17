<template>
  <div class="config-title config-title2">
    {{caption}}
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component()
export default class Title extends Vue {
  // @Prop() private vStyle: string; // style是关键字
  @Prop() private caption: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .config-title {
    display: block;
    zoom: 1;
    width: 100%;
  }

  .config-title2 {
    font-weight: 400;
    color: #45464D;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    background: rgba(240, 242, 245, 1);
    padding: 0 20px;
    text-align: left
  }
</style>

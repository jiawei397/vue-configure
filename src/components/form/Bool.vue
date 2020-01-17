<template>
    <i-switch class="switch" :prop="props.name" v-model="props.defaultValue" size="large">
    </i-switch>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ISwitch {
  name: string;
  caption: string;
  defaultValue: boolean;
}

@Component
export default class Bool extends Vue {
  @Prop() private props: ISwitch;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>

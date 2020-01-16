<template>
  <FormItem class="form-item color-item" :label="caption">
    <ColorPicker :name="name" v-model="defaultValue" size="large">
    </ColorPicker>
  </FormItem>

</template>

<script>
  export default {
    name: 'MyColor',
    props: {
      name: String,
      caption: String,
      defaultValue: String
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .color-item {
    margin-left 20px
    width 550px
  }
</style>

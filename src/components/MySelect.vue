<template>
  <FormItem class="form-item my-form-item" :label="caption">
    <i-select :value="defaultValue" size="large" clearable :filterable="true" :allow-create="allowCreate" placement="top">
      <Option v-for="item in items" :value="item.hideName">{{ item.showName }}</Option>
    </i-Select>
  </FormItem>

</template>

<script>

  export default {
    name: 'MySelect',
    props: {
      name: String,
      caption: String,
      items: Array,
      allowCreate: Boolean, //是否支持创建新的
      defaultValue: [String, Number]
    },
    methods: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

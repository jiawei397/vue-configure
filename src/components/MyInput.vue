<template>
  <FormItem class="form-item my-form-item" :label="caption">
    <i-input :type="type" :prop="name" :value="defaultValue" size="large" :clearable="true">
             <!--@on-blur="blur"-->
             <!--@on-keypress="keypress"-->
    </i-input>
  </FormItem>

</template>

<script>
  export default {
    name: 'MyInput',
    props: {
      name: String,
      caption: String,
      type: String,
      defaultValue: [String, Number]
    },
    methods: {
      // blur (e) {
        // if (this.type !== 'number') {
        //   return;
        // }
        // const event = e || window.event;
        // let value = event.target.value;
        // const reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
        // if (!reg.test(value)) {
        //   value = value.replace(/[^0-9.]/g, '');
        //   event.target.value = value;
        // }
      // },
      // keypress (e) {
        // if (this.type !== 'number') {
        //   return;
        // }
        // const event = e || window.event;
        // const val = event.target.value;
        // //控制第一个不能输入小数点"."
        // if (val.length === 0 && event.which === 46) {
        //   event.preventDefault();
        //   return;
        // }
        // //控制只能输入一个小数点"."
        // if (val.indexOf('.') !== -1 && event.which === 46) {
        //   event.preventDefault();
        //   return;
        // }
        // //控制只能输入的值
        // if (event.which && (event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 46) {
        //   event.preventDefault();
        // }
      // }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>

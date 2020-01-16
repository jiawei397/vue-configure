<template>
  <FormItem class="form-item my-form-item" :label="caption">
    <Button type="primary" :name="name" size="large" @click="click">设置</Button>
    <Modal
      class-name="vertical-center-modal"
      v-model="showList">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </FormItem>
</template>

<script>
  export default {
    name: 'ListEditor',
    props: {
      name: String,
      caption: String,
      defaultValue: Array
    },
    data(){
      return {
        showList: false
      }
    },
    methods: {
      click(){
        console.log('------------');
        this.showList = true;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>

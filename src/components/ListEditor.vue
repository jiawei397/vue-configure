<template>
  <FormItem class="form-item my-form-item" :label="caption">
    <Button type="primary" :name="name" size="large" @click="click">设置</Button>
    <Modal
      class-name="vertical-center-modal"
      width="400px"
      ok-text="保存"
      :title="caption"
      @on-cancel="cancel"
      v-model="showList">
      <div v-for="item in defaultValue">
        <i-input type="text" :value="item"></i-input>
      </div>
      <div>
        <Button type="primary" @click="add">增加</Button>
      </div>
    </Modal>
  </FormItem>
</template>

<script>
  export default {
    name: 'ListEditor',
    props: {
      name: String,
      caption: String,
      defaultValue: Array,
    },
    data () {
      return {
        showList: false,
        originList: []
      }
    },
    methods: {
      click () {
        this.showList = true;
        this.originList = [...this.defaultValue];
      },
      add () {
        this.defaultValue.push('');
      },
      cancel () {
        this.defaultValue.length = 0;
        this.defaultValue.push(...this.originList);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .ivu-modal-body {
    .ivu-input-type-text {
      padding: 0 5px 10px 5px;
    }
  }
</style>

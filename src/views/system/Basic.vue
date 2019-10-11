<template>
  <div>
    <div class="btns">
      <Button class="btn" type="primary" icon="ios-search">上传配置</Button>
      <Button type="primary" icon="ios-search">下载配置</Button>
    </div>
    <Form ref="formItem" :model="formItem" :rules="formItem" :label-width="formItem.labelWidth" class="config-system">
      <ul v-for="item in data">
        <template v-if="item.type==='title'">
         <Title :name="item.caption" :vStyle="item.style" :caption="item.caption"></Title>
        </template>
        <template v-else-if="item.type==='bool'">
          <MySwitch :name="item.name" :caption="item.caption"
                    :val="item.defaultValue"></MySwitch>
        </template>
      </ul>
    </Form>
  </div>
</template>
<script lang="ts">
  import Title from '@/components/Title.vue';
  import Switch from '@/components/Switch.vue';

  export default {
    name: 'basic',
    components: {
      Title,
      MySwitch: Switch
    },
    data() {
      return {
        data: [
          {tab: 'others', type: 'title', style: 'title2', caption: '设定'},
          {//开启前台调试模式
            tab: 'others',
            group: '_system',
            level: 'top',
            name: 'debugJs',
            uinvInterface: 'debugJs',
            caption: '开启前台调试模式',
            type: 'bool',
            defaultValue: true
          },
          {//是否弹提示框
            tab: 'others',
            group: '_system',
            level: 'top',
            name: 'isShowAlert',
            uinvInterface: 'isShowAlert',
            caption: '是否弹提示框',
            type: 'bool',
            defaultValue: true
          }],
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          isDebug: true,
          isShowAlert: false,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: '',
          labelWidth: 250
        }
      }
    },
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status);
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .btns {
    width: 221px;
  }

  .btn {
    margin-right 10px;
  }

  .config-system {
    margin-top 20px
  }

</style>

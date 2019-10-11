<template>
  <div>
    <div class="btns">
      <Button class="btn" type="primary" icon="ios-search">上传配置</Button>
      <Button type="primary" icon="ios-search">下载配置</Button>
    </div>
    <Form ref="formItem" :model="formItem" :rules="formItem" :label-width="formItem.labelWidth" class="config-system">
      <!--<div class="config-title config-title2">设定</div>-->
      <!--<Title :msg="msg">{{msg}}</Title>-->
      <Title>{{msg}}</Title>
      <!--<FormItem class="form-item" label="开启前台调试模式">-->
        <!--<i-switch class="switch" v-model="formItem.isDebug" size="large">-->
        <!--</i-switch>-->
      <!--</FormItem>-->
      <MySwitch :name="isDebug.name" :caption="isDebug.caption" :val="isDebug.defaultValue"></MySwitch>
      <MySwitch :name="isShowAlert.name" :caption="isShowAlert.caption" :val="isShowAlert.defaultValue"></MySwitch>
      <!--<FormItem class="form-item" label="是否弹提示框">-->
        <!--<i-switch class="switch" v-model="formItem.isShowAlert" size="large">-->
        <!--</i-switch>-->
      <!--</FormItem>-->
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
      MySwitch:Switch
    },
    data() {
      return {
        msg:'设定',
        isDebug:{
          caption:'开启前台调试模式',
          name:'isDebug',
          type: 'bool',
          defaultValue: true
        },
        isShowAlert:{
          caption:'是否弹提示框',
          name:'isShowAlert',
          type: 'bool',
          defaultValue: false
        },
        data: [{tab: 'others', type: 'title', style: 'title2', caption: '设定'},
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

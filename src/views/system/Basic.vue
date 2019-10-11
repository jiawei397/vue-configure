<template>
  <div>
    <div class="btns">
      <Button class="btn" type="primary" icon="ios-search">上传配置</Button>
      <Button type="primary" icon="ios-search">下载配置</Button>
    </div>
    <Form ref="basicForm" :model="basicForm" :rules="basicForm" :label-width="labelWidth" class="config-system" label-position="left">
      <ul v-for="item in data">
        <template v-if="item.type==='title'">
          <MyTitle :name="item.caption" :vStyle="item.style" :caption="item.caption"></MyTitle>
        </template>
        <template v-else-if="item.type==='bool'">
          <FormItem class="form-item my-form-item" :label="item.caption">
            <i-switch class="switch" :prop="item.name" v-model="item.defaultValue" size="large">
            </i-switch>
          </FormItem>
        </template>
      </ul>
      <FormItem>
        <Button type="primary" @click="submit('basicForm')">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import MyTitle from '@/components/MyTitle.vue';
  // import MySwitch from '@/components/MySwitch.vue';

  export default {
    name: 'basic',
    components: {
      MyTitle,
      // MySwitch,
    },
    data() {
      const data = [
        {tab: 'others', type: 'title', style: 'title2', caption: '设定'},
        {// 开启前台调试模式
          tab: 'others',
          group: '_system',
          level: 'top',
          name: 'debugJs',
          uinvInterface: 'debugJs',
          caption: '开启前台调试模式',
          type: 'bool',
          defaultValue: true,
        },
        {// 是否弹提示框
          tab: 'others',
          group: '_system',
          level: 'top',
          name: 'isShowAlert',
          uinvInterface: 'isShowAlert',
          caption: '是否弹提示框',
          type: 'bool',
          defaultValue: false,
        }];
      const basicForm: object = {};
      data.forEach((item: object) => {
        if (item.name) {
          basicForm[item.name] = item;
        }
      });
      return {
        data: data,
        labelWidth: 250,
        basicForm
      };
    },
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status);
      },
      submit(name) {
        // console.log(this.$refs[name]);
        console.log(this.basicForm);
        // this.$refs[name].validate((valid) => {
        //   /* valid的值为true/false 如果全部验证了定义的规则 则valid为true 否则为false 使用此方法 无需二次验证 方便快捷*/
        //   console.log('-------');
        //   if (valid) {
        //     // console.log(this);
        //     /* 验证之后需要做的事情 */
        //   }
        // });
      }
    },
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

  .my-form-item{
    margin-left 20px
    width 400px
  }

</style>

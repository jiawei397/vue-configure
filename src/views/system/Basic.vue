<template>
  <div>
    <div class="btns">
      <Button class="btn" type="default" icon="ios-cloud-upload">上传配置</Button>
      <Button type="primary" icon="ios-cloud-download">下载配置</Button>
    </div>
    <Form ref="basicForm" :model="basicForm" :rules="basicForm" :label-width="labelWidth" class="config-system"
          label-position="left">
      <ul v-for="item in data">
        <template v-if="item.type==='title'">
          <MyTitle :vStyle="item.style" :caption="item.caption"></MyTitle>
        </template>
        <template v-else-if="item.type==='bool'">
          <!--<FormItem class="form-item my-form-item" :label="item.caption">-->
          <!--<i-switch class="switch" :prop="item.name" v-model="item.defaultValue" size="large">-->
          <!--</i-switch>-->
          <!--</FormItem>-->
          <MySwitch :props="item"></MySwitch>
        </template>
        <template v-else-if="item.type==='string' || item.type==='number' || item.type==='textarea'">
          <MyInput :name="item.name" :type="item.type==='string'?'text':item.type" :caption="item.caption"
                   :defaultValue="item.defaultValue"></MyInput>
        </template>
        <template v-else-if="item.type==='select'">
          <MySelect :name="item.name" :caption="item.caption" :defaultValue="item.defaultValue" :items="item.items"
                    :allowCreate="item.allowCreate"></MySelect>
        </template>
        <template v-else-if="item.type==='color'">
          <MyColor :name="item.name" :caption="item.caption" :defaultValue="item.defaultValue"></MyColor>
        </template>
        <template v-else-if="item.type==='listEditor'">
          <ListEditor :name="item.name" :caption="item.caption" :defaultValue="item.defaultValue"></ListEditor>
        </template>
      </ul>
      <!--<FormItem>-->
      <!--<Button type="primary" @click="submit('basicForm')">Submit</Button>-->
      <!--<Button style="margin-left: 8px">Cancel</Button>-->
      <!--</FormItem>-->
    </Form>
  </div>
</template>
<script>
  import MyTitle from '@/components/MyTitle.vue';
  import MySwitch from '@/components/MySwitch.vue';
  import MyInput from '@/components/MyInput.vue';
  import MySelect from '@/components/MySelect.vue';
  import MyColor from '@/components/MyColor.vue';
  import ListEditor from '@/components/ListEditor.vue';
  import {types} from "../../enum";

  export default {
    name: 'basic',
    components: {
      MyTitle,
      MySwitch,
      MyInput,
      MySelect,
      MyColor,
      ListEditor
    },
    data () {
      const data = this.$store.getters.originData;
      const basicForm = {};
      data.forEach((item) => {
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
    watch: {
      basicForm: {
        handler (form, oldVal) {
          this.save(form);
        },
        deep: true
      }
    },
    methods: {
      change (status) {
        this.$Message.info('开关状态：' + status);
      },
      save (form) {
        let map = {};
        for (let key in form) {
          map[key] = form[key].defaultValue;
        }
        this.$store.commit(types.SET_CURRENT_DATA, map);
      },
      submit (name) {
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
    mounted () {
      this.save(this.basicForm);
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .btns {
    width: 250px;
  }

  .btn {
    margin-right 10px;
  }

  .config-system {
    margin-top 20px
  }

  .my-form-item {
    margin-left 20px
    width 550px

    .ivu-form-item-content {
      .ivu-input-wrapper, .ivu-select {
        margin-left 120px;
      }
    }
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
</style>

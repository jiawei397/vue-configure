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
          <MySwitch :props="item"></MySwitch>
        </template>
        <template v-else-if="item.type==='string' || item.type==='number' || item.type==='textarea'">
          <MyInput :props="item"></MyInput>
        </template>
        <template v-else-if="item.type==='select'">
          <MySelect :props="item"></MySelect>
        </template>
        <template v-else-if="item.type==='color'">
          <MyColor :props="item"></MyColor>
        </template>
        <template v-else-if="item.type==='listEditor'">
          <ListEditor :name="item.name" :caption="item.caption" :defaultValue="item.defaultValue"
                      @save="saveTemp"></ListEditor>
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
        basicForm,
        complexData: {} //复杂数据存储
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
      /**
       * 临时保存复杂数据
       */
      saveTemp ({name, val}) {
        this.complexData[name] = val;
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

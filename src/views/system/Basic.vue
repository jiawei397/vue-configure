<template>
  <div>
    <div class="btns">
      <Button class="btn" type="default" icon="ios-cloud-upload">上传配置</Button>
      <Button type="primary" icon="ios-cloud-download">下载配置</Button>
    </div>
    <Form ref="basicForm" :model="basicForm" :rules="basicForm" :label-width="labelWidth" class="config-system"
          label-position="left">
      <ul v-for="item in data">
        <template v-if="item.type==='title' || item.type==='line'">
          <Title :caption="item.caption"></Title>
        </template>
        <template v-else-if="item.type==='color'">
          <FormItem class="form-item color-item" :label="item.caption">
            <Color :props="item"></Color>
          </FormItem>
        </template>
        <template v-else>
          <FormItem class="form-item my-form-item" :label="item.caption">
            <template v-if="item.type==='bool'">
              <Bool :props="item"></Bool>
            </template>
            <template v-else-if="item.type==='string' || item.type==='number' || item.type==='textarea'">
              <Input :props="item"></Input>
            </template>
            <template v-else-if="item.type==='select'">
              <Select :props="item"></Select>
            </template>

            <template v-else-if="item.type==='listEditor'">
              <ListEditor :props="item"
                          @save="saveTemp"></ListEditor>
            </template>
          </FormItem>
        </template>
      </ul>
      <!--<FormItem>-->
      <!--<Button type="primary" @click="submit('basicForm')">Submit</Button>-->
      <!--<Button style="margin-left: 8px">Cancel</Button>-->
      <!--</FormItem>-->
    </Form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Title from '@/components/form/Title.vue';
import Bool from '@/components/form/Bool.vue';
import Input from '@/components/form/Input.vue';
import Select from '@/components/form/Select.vue';
import Color from '@/components/form/Color.vue';
import ListEditor from '@/components/form/ListEditor.vue';
import {types} from '../../enum';
import {ISave, IConfigData} from '../../store/modules/data';

export default Vue.extend({
  name: 'basic',
  components: {
    Title,
    Bool,
    Input,
    Select,
    Color,
    ListEditor
  },
  data() {
    const data = this.$store.getters.originData;
    const basicForm: any = {};
    data.forEach((item: IConfigData) => {
      if (item.name) {
        basicForm[item.name] = item;
      }
    });
    return {
      data,
      labelWidth: 250,
      basicForm,
      complexData: {} as any //复杂数据存储
    };
  },
  watch: {
    basicForm: {
      handler(form, oldVal) {
        this.save(form);
      },
      deep: true
    }
  },
  methods: {
    save(form: any) {
      let map = {...this.complexData};
      for (let key in form) {
        map[key] = form[key].defaultValue;
      }
      this.$store.commit(types.SET_CURRENT_DATA, map);
    },
    /**
     * 临时保存复杂数据
     */
    saveTemp({name, val}: ISave) {
      this.complexData[name] = val;
      this.save(this.basicForm);
    }
  },
  mounted() {
    this.save(this.basicForm);
  }
});
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
  .color-item {
    margin-left 20px
    width 550px
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

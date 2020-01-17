<template>
  <FormItem class="form-item my-form-item" :label="props.caption">
    <Button type="primary" :name="props.name" size="large" @click="click">设置</Button>
    <Modal
      class-name="vertical-center-modal"
      width="400px"
      ok-text="保存"
      :title="props.caption"
      @on-cancel="cancel"
      @on-ok="save"
      v-model="showList">
      <div v-for="item in items" :key="item.id">
        <i-input type="text" v-model="item.val">
          <Icon type="md-backspace" slot="append" @click="del(item.id)"/>
        </i-input>
      </div>
      <div>
        <Button type="primary" @click="add">增加</Button>
      </div>
    </Modal>
  </FormItem>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {util} from 'dcv-tool';

interface IListEditor {
  name: string;
  caption: string;
  defaultValue: string;
}

interface IItem {
  id: string;
  val: string | number;
}

@Component
export default class ListEditor extends Vue {
  @Prop() private props: IListEditor;
  private showList: boolean = false;
  private currentList: any[] = [...this.props.defaultValue];
  private items: IItem[] = [];

  getItems(currentList: any[]) {
    return currentList.map((val) => ({
      id: util.createUUID(),
      val
    }));
  }

  init() {
    this.items = this.getItems(this.currentList);
  }

  click() {
    this.showList = true;
    this.init();
  }

  add() {
    this.items.push({
      id: util.createUUID(),
      val: ''
    });
  }

  cancel() {
    this.items.length = 0;
    this.items.push(...this.getItems(this.currentList));
  }

  save() {
    this.currentList = [...this.items.map((item) => item.val)];
    this.$emit('save', {
      name: this.props.name,
      val: this.currentList
    });
  }

  del(id: string) {
    this.items.some((item, i) => {
      if (item.id === id) {
        this.items.splice(i, 1);
        return true;
      }
    });
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

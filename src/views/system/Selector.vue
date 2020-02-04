<template>
  <div @contextmenu.prevent="showBtns()" class="selector">
    <MyList :list="data" :showBtns="showBtns">

    </MyList>
    <Modal
      v-model="isShowMenu"
      class-name="btns-modal"
      width="110px"
      :closable="false"
      :footer-hide="true">
      <List border>
        <ListItem v-for="item in btns" :key="item.key">
          <span @click="click(item)">{{item.name}}</span>
        </ListItem>
      </List>
    </Modal>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import MyList from '../../components/MyList.vue';
  import {eventEmitter} from '../../utils/msg';

  interface IBtn {
    key: string;
    name: string;
  }

  const btns: IBtn[] = [
    {
      key: 'createNode',
      name: '创建节点'
    }, {
      key: 'deleteNode',
      name: '删除节点'
    }, {
      key: 'rename',
      name: '重新命名'
    }, {
      key: 'modifyCondition',
      name: '修改条件'
    }, {
      key: 'deleteCondition',
      name: '删除条件'
    }
  ];

  interface IItem {
    key: string;
    name: string;
    hasCondition?: boolean; //是否配置了条件
    isOne?: boolean; //是否第一级
    children?: IItem[];
  }

  const datas: IItem[] = [{
    key: 'campus',
    name: '园区',
    hasCondition: true,
    children: [{
      key: 'ahah',
      name: 'jw',
      children: [{
        hasCondition: true,
        key: 'aaee',
        name: 'fgg'
      }]
    }]
  }, {
    key: 'building',
    name: '建筑',
    hasCondition: true
  }, {
    key: 'floor',
    name: '楼层'
  }];

  datas.forEach((item) => {
    item.isOne = true;
  });


  export default Vue.extend({
    components: {
      MyList
    },
    data() {
      return {
        data: datas,
        sequence: 1,
        btns,
        isShowMenu: false,
        tempDom: null //记录正激活的节点
      };
    },
    watch: {
      isShowMenu: {
        handler(val) {
          if (!this.tempDom) {
            return;
          }
          if (val) {
            eventEmitter.emit('myListShowMenu', {
              type: 'active',
              dom: this.tempDom
            });
          } else {
            eventEmitter.emit('myListShowMenu', {
              type: 'inactive',
              dom: this.tempDom
            });
          }
        }
      }
    },
    methods: {
      showBtns(item: IBtn, dom: any) {
        this.tempDom = dom; //必须在下面之前
        this.isShowMenu = true;
        if (item) {
          this.btns = btns;
        } else {
          this.btns = [btns[0]];
        }
      },
      click(item: IBtn) {
        console.log(`${item.name}被点击了！`);
        if (item.key === 'createNode') {
          this.data.push({
            key: `newCode${this.sequence}`,
            name: `新节点-${this.sequence}`
          });
          this.sequence++;
          this.isShowMenu = false;
          this.tempDom = null;
        }
      }
    }
  });
</script>

<style lang="stylus">
  .selector {
    height 100%
  }

  .btns-modal {
    .ivu-modal {
      margin-left: 130px;

      .ivu-modal-body {
        padding: 0

        span {
          cursor pointer
          font-size 14px !important
        }

        span:hover {
          color coral
        }
      }
    }
  }

</style>

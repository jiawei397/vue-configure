<template>
  <div @contextmenu.prevent="showBtns()" class="selector">
    <List border class="list">
      <ListItem v-for="item in data" :key="item.key">
        <span @contextmenu.prevent.stop="showBtns(item)">{{item.name}}</span>
      </ListItem>
    </List>
    <Modal
      v-model="isShowBtns"
      class-name="btns-modal"
      width="110px"
      :closable="false"
      :footer-hide="true">
      <List border class="btns">
        <ListItem v-for="item in btns" :key="item.key">
          <span @click="click(item)">{{item.name}}</span>
        </ListItem>
      </List>
    </Modal>
  </div>
</template>
<script>
  const btns = [
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

  export default {
    data () {
      return {
        data: [{
          key: 'campus',
          name: '园区'
        }, {
          key: 'building',
          name: '建筑'
        }, {
          key: 'floor',
          name: '楼层'
        }],
        btns: btns,
        isShowBtns: false
      }
    },
    methods: {
      showBtns (item) {
        this.isShowBtns = true;
        if (item) {
          this.btns = btns;
        } else {
          this.btns = [btns[0]];
        }
      },
      click (item) {
        console.log(`${item.name}被点击了！`);
      }
    }
  }
</script>

<style lang="stylus">
  .selector {
    height 100%

    .list {
      margin 0 15px
    }

    span {
      cursor pointer
      font-size 14px !important
      font-weight 600
    }

    span:hover {
      color red
    }
  }

  .btns-modal {
    .ivu-modal {
      margin-left: 130px;

      .ivu-modal-body {
        padding: 0
      }
    }
  }

</style>

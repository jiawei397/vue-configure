<template>
  <div @contextmenu.prevent="showBtns()" class="selector">
    <myList :list="data" @contextmenuFun="showBtns">

    </myList>
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

  import myList from '../../components/MyList';

  export default {
    components: {
      myList
    },
    data() {
      return {
        data: [{
          key: 'campus',
          name: '园区',
          children: [{
            key: 'ahah',
            name: 'jw'
          }]
        }, {
          key: 'building',
          name: '建筑'
        }, {
          key: 'floor',
          name: '楼层'
        }],
        sequence: 1,
        btns: btns,
        isShowBtns: false
      };
    },
    methods: {
      showBtns(item) {
        this.isShowBtns = true;
        if (item) {
          this.btns = btns;
        } else {
          this.btns = [btns[0]];
        }
      },
      click(item) {
        console.log(`${item.name}被点击了！`);
        if (item.key === 'createNode') {
          this.data.push({
            key: `newCode${this.sequence}`,
            name: `新节点-${this.sequence}`
          });
          this.sequence++;
          this.isShowBtns = false;
        }
      }
    }
  };
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

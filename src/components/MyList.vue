<template>
  <div>
    <ul class="myList">
      <li v-for="item in list" :key="item.key">
        <!--<ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">-->
        <!--</ListItemMeta>-->
        <i class="ivu-icon ivu-icon-md-arrow-dropup" v-show="item.children && item.children.length" @click="show"/>
        <span @contextmenu.stop.prevent="contextmenu($event, item)"
              :class="(item.hasCondition ? 'condition ' : '') + (item.children && item.children.length ? '' :'empty ') + (item.isOne ? 'one' :'')">
            {{item.name}}
          </span>
        <template v-if="item.children && item.children.length">
          <myList :list="item.children" :showBtns="showBtns"></myList>
        </template>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  interface IList {
    key: string;
    name: string;
    children: IList[];
  }

  @Component({name: 'myList'})
  export default class MyList extends Vue {
    @Prop() private list: IList[];
    @Prop() private showBtns: (item: any) => void;

    contextmenu(e: Event, item: any) {
      // debugger;
      // console.log(item);
      const dom = e.target;
      // console.log(dom);
      this.showBtns(item);
      // this.$emit('contextmenuFun', item);
    }

    show(e: Event) {
      console.log(e);
      const icon = e.target as HTMLElement;
      const div = (icon.parentNode as HTMLElement).children[1];
      if (div.children) {
        icon.classList.remove('ivu-icon-md-arrow-dropup');
        icon.classList.add('ivu-icon-md-arrow-dropdown');
        [...div.children].forEach((child: any) => {
          if (child.style.display === 'none') {
            child.style.display = 'block';
          } else {
            child.style.display = 'none';
          }
        });
      } else {
        icon.classList.remove('ivu-icon-md-arrow-dropdown');
        icon.classList.add('ivu-icon-md-arrow-dropup');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  ul, li {
    list-style none;
  }

  ul {
    padding-left 25px
    text-align left;
    border 1px solid rebeccapurple

    li {
      line-height 30px

      i {
        margin-left -20px;
        cursor pointer
      }

      span {
        cursor pointer
        font-size 14px !important
        font-weight normal;

        &.condition {
          font-weight 600
        }

        &.empty {
          margin-left -20px;
        }

        &.one {
          margin-left 0;
        }

        &:hover, &.active {
          color: orangered
        }
      }
    }
  }
</style>

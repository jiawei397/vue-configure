<template>
  <div>
    <ul class="myList">
      <li v-for="item in list" :key="item.key">
        <!--<ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">-->
        <!--</ListItemMeta>-->
        <i class="ivu-icon ivu-icon-md-arrow-dropup" v-show="item.children && item.children.length" @click="show"/>
        <span @contextmenu.prevent.stop="contextmenu(item)"
              :class="(item.condition ? 'condition ' : '') + (item.children && item.children.length ? '' :'empty ') + (item.isOne ? 'one' :'')">
            {{item.name}}
              <template v-if="item.children && item.children.length">
                <myList :list="item.children" @contextmenuFun="contextmenu"></myList>
              </template>
          </span>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  interface IList {
    key: string;
    name: string;
    children: IList[];
  }

  @Component
  export default class MyList extends Vue {
    @Prop() private list: IList[];

    contextmenu(item: any) {
      this.$emit("contextmenuFun", item);
    }

    show(e) {
      // console.log(e);
      const icon = e.target;
      const div = icon.parentNode.children[1];
      if (div.children) {
        icon.classList.remove("ivu-icon-md-arrow-dropup");
        icon.classList.add("ivu-icon-md-arrow-dropdown");
        Array.from(div.children).forEach((child) => {
          if (child.style.display === "none") {
            child.style.display = "block";
          } else {
            child.style.display = "none";
          }
        });
      } else {
        icon.classList.remove("ivu-icon-md-arrow-dropdown");
        icon.classList.add("ivu-icon-md-arrow-dropup");
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

        &.one{
          margin-left 0;
        }

        &:hover, &.active {
          color: orangered
        }
      }
    }
  }
</style>

<template>
  <div>
    <List class="myList" :split="false">
      <ListItem v-for="item in list" :key="item.key">
        <!--<ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">-->
        <!--</ListItemMeta>-->
        <Icon type="md-arrow-dropup" v-show="item.children && item.children.length"/>
        <span @contextmenu.prevent.stop="contextmenu(item)">
            {{item.name}}
              <template v-if="item.children && item.children.length">
                <myList :list="item.children"></myList>
              </template>
          </span>
      </ListItem>
    </List>
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

  contextmenu(item: any) {
    this.$emit('contextmenuFun', item);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .myList {
    margin 0 15px

    span {
      cursor pointer
      font-size 14px !important
      font-weight 600
    }

    span:hover {
      color red
    }
  }
</style>

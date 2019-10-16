<template>
  <div class="resource">
    <Table :columns="columns" :data="data" stripe border>
      <template slot-scope="{ row, index }" slot="name">
        <div>
          <Icon type="person"></Icon>
          <strong>{{row.name}}</strong>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="serverDir">
        <a :href="row.realPath" target="_blank">{{ row.serverDir }}</a>
      </template>
      <template slot-scope="{ row, index }" slot="localDir">
        <span>{{ row.localDir }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="version">
        <span>{{ row.version }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div style="text-align: center">
          <Button icon="md-settings" size="small" type="text" @click="show(index)">编辑</Button>
          <Button icon="ios-remove-circle" size="small" type="text" @click="remove(index)">删除</Button>
        </div>
      </template>
    </Table>
    <div class="btn">
      <Button size="default" icon="ios-download-outline" type="primary" @click="showWin=true">创建资源</Button>
    </div>
    <Modal
      title="创建资源"
      v-model="showWin"
      class-name="vertical-center-modal" width="450px" :footer-hide="true">
      <Form :model="formItem" :label-width="100" label-position="left">
        <FormItem label="资源名称" class="form-item">
          <Input v-model="formItem.name"></Input>
        </FormItem>
        <FormItem label="本地目录" class="form-item">
          <Input v-model="formItem.localDir"></Input>
        </FormItem>
        <FormItem label="版本" class="form-item">
          <Input v-model="formItem.version"></Input>
        </FormItem>
        <FormItem label="资源包" class="form-item">
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
          <span id="fileTitle" v-show="file">{{file.name}}</span>
        </FormItem>
      </Form>
      <div class="btns">
        <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
        <Button @click="cancel" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {upload} from "../../utils/ajax";

  const url = '/projects/resources/';

  export default {
    name: 'resource',
    data () {
      return {
        showWin: false,
        file: {},
        formItem: {
          name: '',
          localDir: '',
          version: ''
        },
        columns: [
          {
            title: '资源名称',
            slot: 'name'
          },
          {
            title: '服务器目录',
            slot: 'serverDir'
          },
          {
            title: '本地目录',
            slot: 'localDir'
          },
          {
            title: '资源版本',
            slot: 'version'
          },
          {
            title: '操作',
            slot: 'action',
            width: 180,
            // align: 'center'
          }
        ],
        data: [
          {
            name: 'John Brown',
            serverDir: 18,
            realPath: 'http://www.baidu.com',
            localDir: 18,
            version: 1
          },
          {
            name: 'Jim Green',
            serverDir: 'http://aa.com',
            realPath: 'http://www.baidu.com',
            localDir: 'c://localDir',
            version: 1
          },
          {
            name: 'Jim Green',
            serverDir: 'http://aa.com',
            realPath: 'http://www.baidu.com',
            localDir: 'c://localDir',
            version: 1
          },
          {
            name: 'Jim Green',
            serverDir: 'http://aa.com',
            realPath: 'http://www.baidu.com',
            localDir: 'c://localDir',
            version: 1
          },
        ]
      }
    },
    methods: {
      show (index) {
        this.formItemBak = this.formItem;
        this.formItem = this.data[index];
        this.showWin = true;
      },
      remove (index) {
        this.data.splice(index, 1);
      },
      cancel () {
        this.showWin = false;
      },
      async handleSubmit () {
        if (!this.file) {
          console.error('请先上传文件！');
          return;
        }
        console.log(this.formItem);
        console.log(this.file);
        const obj = {
          'file': this.file,
          'URL': url,
          'fileName': this.file.name
        };
        try {
          let result = await upload('cframe/upFile', obj);
          // console.log(result);
          this.showWin = false;
          this.data.push({
            name: this.formItem.name,
            serverDir: `${url}${this.file.name}`,
            realPath: result.realpath,
            localDir: this.formItem.localDir,
            version: this.formItem.version
          })
        } catch (e) {
          alert(e.message);
        }
      },
      handleUpload (file) {
        this.file = file;
        return false;
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .resource {
    margin-left 20px
  }

  .btn {
    float: left
    margin-top 10px
  }

  .form-item {
    margin-bottom 15px
  }

  .btns {
    margin 0
    text-align center
  }

  a {
    color #333333
    cursor pointer
  }

  a:hover {
    text-decoration underline
  }
</style>

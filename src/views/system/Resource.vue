<template>
  <div class="resource">
    <Table stripe border :columns="header" :data="data"></Table>
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
        header: [
          {
            title: '资源名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '服务器目录',
            key: 'serverDir'
          },
          {
            title: '本地目录',
            key: 'localDir'
          },
          {
            title: '资源版本',
            key: 'version'
          },
          {
            title: 'Action',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    // type: 'primary',
                    size: 'small',
                    // ghost: true,
                    type: 'text',
                    icon: "md-settings"
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    // type: 'error',
                    size: 'small',
                    type: 'text',
                    icon: "ios-remove-circle"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [
          {
            name: 'John Brown',
            serverDir: 18,
            localDir: 18,
            version: 1
          },
          {
            name: 'Jim Green',
            serverDir: 'http://aa.com',
            localDir: 'c://localDir',
            version: 1
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },
    methods: {
      show (index) {
        // this.$Modal.info({
        //   title: 'User Info',
        //   content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
        // });
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
          'URL': '/projects/resources/',
          'fileName': this.file.name
        };
        try {
          let result = await upload('cframe/upFile', obj);
          // console.log(result);
          this.showWin = false;
          this.data.push({
            name: this.formItem.name,
            serverDir: result.realpath,
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
  }
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
</style>

<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>{{this.articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-position="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType()">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 素材选择组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-img v-model="articleForm.cover.images[0]"></my-img>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-img v-model="articleForm.cover.images[0]"></my-img>
            <my-img v-model="articleForm.cover.images[1]"></my-img>
            <my-img v-model="articleForm.cover.images[2]"></my-img>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="articleId">
          <el-button type="success" @click="updata(false)">修改</el-button>
          <el-button @click="updata(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="submit(false)">保存</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleId: null
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },

  created () {
    // 获取地址栏参数
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getAticle()
    }
  },
  methods: {
    // 获取修改内容
    async getAticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 图片清空
    changeType () {
      this.articleForm.cover.images = []
    },
    submit (draft) {
      this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '文章发表成功')
      // 跳转到内容管理
      this.$router.push('/article')
    },
    updata (draft) {
      this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '草稿修改成功' : '文章修改成功')
      // 跳转到内容管理
      this.$router.push('/article')
    }
  }
}
</script>
<style scoped lang='less'></style>

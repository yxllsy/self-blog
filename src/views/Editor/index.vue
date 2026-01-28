<template>
  <div class="editor">
    <el-form ref="form" :model="editorForm" label-width="80px">
      <el-form-item label="标题" v-if="editorForm.kind != '3'">
        <el-input v-model="editorForm.title" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="封面" v-if="editorForm.kind != '3'">
        <el-upload
            class="avatar-uploader"
            action="/YLApi/article/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="editorForm.cover" :src="editorForm.cover" class="avatar-cover" alt="封面"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="editorForm.kind" placeholder="请选择文章类型">
          <el-option label="首页" value="1"></el-option>
          <!--<el-option label="个人归档" value="2"></el-option>-->
          <el-option label="心情随笔" value="3"></el-option>
          <el-option label="畅言" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" v-if="editorForm.kind != '3'">
        <el-input
            type="textarea"
            v-model="editorForm.intro"
            placeholder="请输入简介"
            :rows="4"
        />
      </el-form-item>
      <el-form-item label="内容">
        <editor ref="editorRef"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import editor from "@/components/editor.vue";
import {ref} from "vue";
import {Plus} from '@element-plus/icons-vue'
import {commonApi} from "@/api";
import moment from "moment"
import { ElMessage } from 'element-plus'

interface editorFormInterface {
  title: string;
  kind: string;
  content: string;
  author: string;
  intro: string;
  cover: string;
}
// @ts-ignore
const editorRef = ref(null);
const editorForm = ref<editorFormInterface>({
  title: '',
  kind: '',
  content: '',
  author: '',
  intro: '',
  cover: ''
});

const handleAvatarSuccess = (res:any) => {
  editorForm.value.cover = '/fileUrl' + res.data.url
}
const submitForm = () => {
  commonApi.issueArticle({
    ...editorForm.value,
    cover: editorForm.value.cover.replace('/fileUrl', ''),
    date: moment().format("yyyy-MM-DD"),
    // @ts-ignore
    content: editorRef?.value?.valueHtml || '',
    original: 1,
    author: editorForm.value.kind === '4' ? '版主' : 'admin'
  }).then((res: any) => {
    ElMessage({
      message: res.message || res.msg,
      type: res.code === 200 ? 'success' : 'warning'
    })
    res.code === 200 && window.location.reload();
  })
};
const resetForm = () => {
  editorForm.value = {} as editorFormInterface;
  // @ts-ignore
  editorRef?.value?.clearContent();
}
</script>

<style lang="less" scoped>
.editor {
  background: rgba(#fff, .5);
  color: #fff;
  padding: 16px;
  margin: 16px;
  .avatar-cover {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>


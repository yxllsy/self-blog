<template>
  <div class="home">
    <div class="article-card">
      <el-form ref="form" :model="editorForm" label-width="100px">
        <el-form-item label="畅言用户名称">
          <el-input v-model="editorForm.author" placeholder="畅言用户名称"/>
        </el-form-item>
        <el-form-item label="畅言内容">
          <el-input type="textarea" placeholder="畅所欲言..." v-model="editorForm.content" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="article-card"  v-for="article in articleList" :key="article.id">
      <div class="article-card-content" v-html="article.content" />
      <div class="article-card-date">
        {{ formatLocation(article.locationInfo) }}
        {{ article.author === 'admin' ? '叶胜隆' : article.author }}
        {{formatDate(article.create_time)}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import {commonApi} from "@/api";
import { generateChineseName } from "@/utils/utils"
import {ElMessage, ElMessageBox} from "element-plus";
interface locationInfo {
  province: string;
  city: string;
}
interface Article {
  id: string | number;
  content: string;
  create_time: string;
  author: string;
  locationInfo: locationInfo;
}
interface ApiResult<T = any> {
  code: number;
  msg: string;
  data: T;
  total: number;
}
const articleList = ref<Article[]>([])
const total = ref(0)

const formatDate = (date: string) => {
  return moment.utc(date).utcOffset(8).format('yyyy-MM-DD HH:mm:ss');
};
const formatLocation = (locationInfo: locationInfo) => {
  return `${locationInfo.province} ${locationInfo.city}`
}

interface editorFormInterface {
  author: string;
  content: string;
}
const editorForm = ref<editorFormInterface>({
  author: '',
  content: '',
});
const getArticleList = () => {
  commonApi.getArticleList({
    currentPage: 1,
    limit: 9999,
    kind: 4
  }).then((res: ApiResult<Article[]>) => {
    res.data = res.data.map((item: any) => {
      item.locationInfo = JSON.parse(item.location_info)
      delete item.location_info
      return item
    })
    const adminData = res.data.find((item: any) => {
      return item.author === 'admin'
    })
    articleList.value = adminData ? [adminData, ...(res.data.filter((item: any) => item.author !== 'admin'))] : res.data
    total.value = res.total
  })
}
onMounted(() => {
  getArticleList()
});
/**
 * 处理随机作者名称（抽离独立函数，单一职责）
 */
const handleRandomAuthor = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    ElMessageBox.alert(
        "当前未填写畅言用户，是否生成随机用户名称",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "info", // 补充消息类型，提升UI一致性
        }
    )
        .then(() => {
          resolve(generateChineseName()); // 确认则生成随机名称
        })
        .catch(() => {
          reject(new Error("用户取消生成随机作者")); // 取消则拒绝Promise
        });
  });
};
const resetForm = () => {
  editorForm.value = {} as editorFormInterface;
}
const submitForm = async () => {
  try {
    const author = editorForm.value.author || (await handleRandomAuthor());
    const res = await commonApi.issueArticle({
      ...editorForm.value,
      author,
      date: moment().format("yyyy-MM-DD HH:mm:ss"),
      original: 1,
      kind: 4,
      title: author
    });
    ElMessage({
      message: res?.message || res?.msg || "操作完成",
      type: res?.code === 200 ? "success" : "warning",
    });
    if (res?.code === 200) {
      getArticleList()
      resetForm()
    }
  } catch (error) {
    console.error("发布文章失败：", error);
    ElMessage.error("发表失败，请稍后重试");
  }
};
</script>

<style lang="less" scoped>
.home {
  color: #fff;
  padding: 16px 16px 0;
  width: 100%;
  .article-card {
    background: rgba(#fff, .5);
    color: gray;
    height: auto;
    margin-bottom: 16px;
    padding: 16px 16px 8px;
    &:last-child {
      margin-bottom: 0;
    }
    .article-card-content {
      padding: 0.5em 0;
    }
    .article-card-date {
      text-align: right;
    }
  }
}
</style>


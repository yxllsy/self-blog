<template>
  <div class="home">
    <div class="article-card"  v-for="article in articleList" :key="article.id">
      <div class="article-card-content" v-html="article.content" />
      <div class="article-card-date">{{formatDate(article.date)}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import moment from "moment";
  import {commonApi} from "@/api";
  interface Article {
    id: string | number;
    content: string;
    date: string;
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
    return moment.utc(date).utcOffset(8).format('YYYY-MM-DD');
  };

  onMounted(() => {
    commonApi.getArticleList({
      currentPage: 1,
      limit: 9999,
      kind: 3
    }).then((res: ApiResult<Article[]>) => {
      articleList.value = res.data
      total.value = res.total
    })
  });
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
    padding: 16px;
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


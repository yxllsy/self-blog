<template>
  <div class="home">
    <div class="article-card" :class="[{'mobile_card': isMobileOrPc()}]"  v-for="article in articleList" :key="article.id" @click="previewArticle(article.id)">
      <div class="article-card-header">
        <div class="article-card-title">{{ article.title }}</div>
      </div>
      <div class="article-card-body">
        <el-image :src="article.cover" class="article-card-cover" />
        <div class="article-card-content" v-html="article.intro ? article.intro : article.content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import {commonApi} from "@/api";
  import { isMobileOrPc } from "@/utils/utils";
  import { useRouteHelper } from "@hooks/useRouteHelper";
  interface Article {
    id: string | number;
    title: string;
    content: string;
    author: string;
    intro: string;
    cover: string;
  }
  interface ApiResult<T = any> {
    code: number;
    msg: string;
    data: T;
    total: number;
  }
  const articleList = ref<Article[]>([])
  const total = ref(0)
  const { redirectTo } = useRouteHelper()
  const previewArticle = (id:string | number) => {
    redirectTo(`/article/${id}`)
  }
  onMounted(() => {
    commonApi.getArticleList({
      currentPage: 1,
      limit: 9999,
      kind: 1
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
    max-height: 280px;
    margin-bottom: 16px;
    padding: 16px;
    &:last-child {
      margin-bottom: 0;
    }
    .article-card-title {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .article-card-body {
      display: flex;
    }
    .article-card-cover {
      width: 180px;
      height: 164px;
      margin-right: 12px;
    }
    .article-card-content {
      max-width: calc(100% - 180px - 12px);
      padding: 0 0 0.5em;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      line-height: 1.7;
      height: calc(1.7em * 6);
      color: gray;
      ::v-deep p {
        margin: 0;
      }
    }
    &.mobile_card {
      max-height: 175px;
      .article-card-cover {
        width: 140px;
        height: 105px;
      }
      .article-card-content {
        max-width: calc(100% - 140px - 12px);
        -webkit-line-clamp: 7;
        line-height: 1.55;
        height: calc(1.48em * 7);
        ::v-deep p {
          margin: 0;
        }
      }
    }
  }
}
</style>


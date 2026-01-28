<template>
  <div class="blog-post" :class="[{'mobile_post': isMobileOrPc()}]">
    <header class="post-header">
      <h1 class="post-title">{{ articleInfo.title }}</h1>
      <div class="post-meta">
        <div class="meta-item">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
            <path d="M14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
            <path d="M4 12h16"></path>
            <path d="M6 16h12"></path>
            <path d="M10 20h4"></path>
          </svg>
          <span>{{ articleInfo.author === 'admin' ? '叶胜隆' : '匿名' }}</span>
        </div>

        <div class="meta-item">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{{ formatDate(articleInfo.date) }}</span>
        </div>
      </div>
    </header>
    <!-- 文章封面图 -->
    <div class="post-cover" v-if="articleInfo.cover">
      <img
          :src="articleInfo.cover"
          :alt="articleInfo.title"
          class="cover-image"
          loading="lazy"
      >
    </div>
    <div class="post-content">
      <div
          class="prose prose-lg dark:prose-invert max-w-none"
          v-html="articleInfo.content"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouteHelper } from "@hooks/useRouteHelper";
import { isMobileOrPc } from "@/utils/utils";
const { getParamsParam, getQueryParam } = useRouteHelper()
import moment from "moment";
import {commonApi} from "@/api";
const articleInfo = ref({});
const formatDate = (dateString) => {
  return moment(dateString).format('yyyy年MM月DD日');
};
onMounted(() => {
  const articleId = getParamsParam('id');
  commonApi.getArticle({
    id: articleId,
  }).then((res) => {
    articleInfo.value = res.data ? res.data[0] : {}
  })
});
</script>

<style lang="less" scoped>
/* 基础样式 */
.blog-post {
  background: rgba(#fff, .5);
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 标题样式 */
.post-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

/* 元信息样式 */
.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  width: 16px;
  height: 16px;
}

/* 封面图样式 */
.post-cover {
  margin-bottom: 2.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.cover-image:hover {
  transform: scale(1.01);
}
/* 正文样式 */
.post-content {
  margin-bottom: 2.5rem;
}
.mobile_post {
  padding: 2em;
  margin: 0 2em;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .post-title {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
  }
  .post-meta {
    font-size: 14px;
    margin-bottom: 12px;
    .icon {
      width: 12px;
      height: 12px;
    }
  }
  .post-cover {
    margin-bottom: 12px;
  }
}
</style>

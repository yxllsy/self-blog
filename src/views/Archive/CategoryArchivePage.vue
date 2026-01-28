<template>
  <div class="category-archive-page max-w-3xl mx-auto p-4 md:p-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-2">
        分类：{{ currentCategory?.name }}（{{ articles.length }} 篇）
      </h1>
      <router-link to="/archive" class="text-blue-600 hover:underline text-sm">
        ← 返回归档总页
      </router-link>
    </div>

    <!-- 文章列表 -->
    <div class="article-card-list space-y-6">
      <div
          v-for="article in articles"
          :key="article.id"
          class="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <router-link :to="article.url">
          <h3 class="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {{ article.title }}
          </h3>
        </router-link>
        <div class="mt-3 text-sm text-gray-500 flex items-center gap-4">
          <span>{{ article.createTime }}</span>
          <span>{{ article.categoryName }}</span>
        </div>
        <p class="mt-4 text-gray-600 line-clamp-2">
          {{ article.summary }} <!-- 文章摘要，实际项目从接口获取 -->
        </p>
        <router-link
            :to="article.url"
            class="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          阅读全文 →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = route.params.id // 从路由获取分类 ID

// 当前分类信息
const currentCategory = ref(null)
// 该分类下的文章列表
const articles = ref([])

// 模拟接口请求（实际项目替换为真实接口）
const fetchCategoryArticles = async () => {
  // 1. 获取分类信息
  const categoryList = [
    { id: 1, name: '前端开发', articleCount: 15, url: '/archive/category/1' },
    // ... 同组件中的分类数据
  ]
  currentCategory.value = categoryList.find(item => item.id == categoryId) || null

  // 2. 获取该分类下的文章
  const allArticles = [
    { id: 1, title: 'Vue3 + Pinia 持久化完全指南', createTime: '2025-10-23', categoryName: '前端开发', url: '/archive/category/1', summary: '详细介绍 Pinia 的 Composition API 风格持久化配置，包含自定义存储、序列化等高级用法...' },
    // ... 更多文章数据
  ]
  articles.value = allArticles.filter(article => article.categoryName === currentCategory.value?.name)
}

onMounted(() => {
  fetchCategoryArticles()
})
</script>

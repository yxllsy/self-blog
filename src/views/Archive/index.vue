<template>
  <div class="archive-container w-full max-w-3xl mx-auto p-4 md:p-8">
    <!-- 归档标题 -->
    <h2 class="text-2xl font-bold mb-8 text-center">文章归档</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 左侧：时间归档（年→月） -->
      <div class="time-archive card shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          时间归档
        </h3>

        <!-- 年份列表 -->
        <div class="year-list space-y-4">
          <div v-for="yearItem in yearArchives" :key="yearItem.year" class="year-item">
            <!-- 年份标题（可点击折叠/展开） -->
            <div
                @click="toggleYearExpand(yearItem.year)"
                class="year-header flex items-center justify-between cursor-pointer py-2 border-b border-gray-100"
            >
              <span
                  :class="['font-medium', activeYear === yearItem.year ? 'text-blue-600' : 'text-gray-700']"
              >
                {{ yearItem.year }} 年（{{ yearItem.totalCount }} 篇）
              </span>
              <svg
                  class="w-4 h-4 text-gray-500 transition-transform"
                  :class="yearItem.isExpanded ? 'rotate-180' : ''"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- 月度列表（折叠/展开） -->
            <div v-if="yearItem.isExpanded" class="month-list pl-4 mt-2 space-y-3">
              <div v-for="monthItem in yearItem.months" :key="`${yearItem.year}-${monthItem.month}`">
                <div class="month-title text-sm font-medium text-gray-600 mb-1">
                  {{ monthItem.month }} 月（{{ monthItem.articleCount }} 篇）
                </div>
                <ul class="article-list text-sm space-y-1">
                  <li v-for="article in monthItem.articles" :key="article.id">
                    <router-link
                        :to="article.url"
                        class="text-gray-500 hover:text-blue-600 transition-colors block truncate"
                        @click="setActiveYear(yearItem.year)"
                    >
                      {{ article.title }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：分类归档 -->
      <div class="category-archive card shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          分类归档
        </h3>

        <div class="category-list space-y-3">
          <div v-for="category in categoryArchives" :key="category.id">
            <router-link
                :to="category.url"
                class="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                :class="activeCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'"
                @click="setActiveCategory(category.id)"
            >
              <span>{{ category.name }}</span>
              <span class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {{ category.articleCount }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArchiveStore } from '@/stores/archive'

// 注入 Pinia 状态
const archiveStore = useArchiveStore()
const router = useRouter()
const route = useRoute()

// ------------- 模拟归档数据（实际项目替换为后端接口请求）-------------
const yearArchives = ref([
  {
    year: 2025,
    totalCount: 8,
    isExpanded: true, // 默认展开当前年份
    months: [
      {
        month: 10,
        articleCount: 3,
        articles: [
          { id: 1, title: 'Vue3 + Pinia 持久化完全指南', createTime: '2025-10-23', categoryName: '前端开发', url: '/archive/category/1' },
          { id: 2, title: 'TypeScript 类型定义实战：从基础到高级', createTime: '2025-10-15', categoryName: '前端开发', url: '/archive/category/2' },
          { id: 3, title: '个人博客归档功能实现（Vue3 + TS）', createTime: '2025-10-08', categoryName: '项目实战', url: '/archive/category/3' },
        ]
      },
      {
        month: 9,
        articleCount: 5,
        articles: [
          { id: 4, title: 'Vue Router 4 路由守卫全解析', createTime: '2025-09-28', categoryName: '前端开发', url: '/archive/category/4' },
          { id: 5, title: 'Tailwind CSS 高效开发技巧', createTime: '2025-09-12', categoryName: '前端开发', url: '/archive/category/5' },
          // 更多文章...
        ]
      }
    ]
  },
  {
    year: 2024,
    totalCount: 12,
    isExpanded: false,
    months: [
      {
        month: 12,
        articleCount: 4,
        articles: [
          { id: 6, title: '2024 前端技术总结：Vue3 生态篇', createTime: '2024-12-30', categoryName: '技术总结', url: '/archive/category/6' },
          // 更多文章...
        ]
      }
      // 更多月份...
    ]
  }
])

const categoryArchives = ref([
  { id: 1, name: '前端开发', articleCount: 15, url: '/archive/category/frontend' },
  { id: 2, name: '项目实战', articleCount: 3, url: '/archive/category/project' },
  { id: 3, name: '技术总结', articleCount: 4, url: '/archive/category/summary' },
  { id: 4, name: '工具推荐', articleCount: 2, url: '/archive/category/tools' },
])

// ------------- 逻辑处理 -------------
// 折叠/展开年份
const toggleYearExpand = (targetYear) => {
  yearArchives.value = yearArchives.value.map(item => {
    if (item.year === targetYear) {
      return { ...item, isExpanded: !item.isExpanded }
    }
    return item
  })
}

// 同步路由参数与活跃状态（如从分类页跳转回来，高亮对应分类）
watch(
    () => route.path,
    (newPath) => {
      // 分类归档页路由示例：/archive/category/1
      if (newPath.startsWith('/archive/category/')) {
        const categoryId = route.params.id
        archiveStore.setActiveCategory(categoryId)
      } else {
        archiveStore.setActiveCategory(null)
      }
    },
    { immediate: true }
)

// 暴露给模板的状态和方法
const { activeYear, activeCategory, setActiveYear, setActiveCategory } = archiveStore
</script>

<style scoped>
.archive-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.card {
  background: white;
  border-radius: 8px;
}

.year-header:hover .text-gray-700 {
  color: #2563eb; /* 蓝色 hover 效果 */
}

.article-list li:hover {
  background-color: #f9fafb;
  border-radius: 4px;
  padding-left: 4px;
}
</style>

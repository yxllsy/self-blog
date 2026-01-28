// src/stores/archive.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArchiveStore = defineStore('archive', () => {
    // 活跃的年份（用于高亮选中）
    const activeYear = ref<number | null>(null)
    // 活跃的分类（用于高亮选中）
    const activeCategory = ref<string | number | null>(null)

    // 设置活跃年份
    const setActiveYear = (year: number | null) => {
        activeYear.value = year
    }

    // 设置活跃分类
    const setActiveCategory = (categoryId: string | number | null) => {
        activeCategory.value = categoryId
    }

    return { activeYear, activeCategory, setActiveYear, setActiveCategory }
}, {
    persist: true // 持久化活跃状态（刷新不丢失）
})

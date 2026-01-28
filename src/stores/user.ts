// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义并导出 Store，id 为唯一标识（必填）
export const useUserStore = defineStore('user', () => {
    const adminStatus = ref(false)
    const isLogin = computed(() => adminStatus.value)
    const setAdminStatus = (status: boolean) => {
        adminStatus.value = status
    }
    return {
        adminStatus,
        isLogin,
        setAdminStatus
    }
}, {
    persist: {
        key: 'user', // 自定义存储的 key（默认是 Store id）
        storage: sessionStorage, // 存储方式：sessionStorage（默认 localStorage）
        pick: ['adminStatus'], // 只持久化指定字段（支持嵌套）
        // 可选：自定义序列化/反序列化逻辑（处理复杂状态）
        serializer: {
            // 存储时序列化（默认 JSON.stringify）
            serialize: (value) => JSON.stringify(value),
            // 读取时反序列化（默认 JSON.parse）
            deserialize: (value) => JSON.parse(value)
        }
    }, // 持久化
})

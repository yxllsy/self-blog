<template>
  <div class="header_content">
    <div class="header_title">{{ title }}</div>
    <div class="header_list">
      <div class="header_list_item" :class="[{'mobile_item': useProps.isMobile}]" v-for="item in list" :key="item.value" @click="handleJump(item.path)">{{ item.label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {onMounted, ref, watch, } from "vue";
  import { ElMessage } from 'element-plus'
  import { useRouteHelper } from "@hooks/useRouteHelper";
  import { useUserStore } from "@stores/user";
  const { redirectTo } = useRouteHelper()
  const title = "伴随相遇";
  const list = ref([
    { label: '首页', value: 'home', path: '/' },
    { label: '个人归档', value: 'self', path: '' },
    { label: '心情随笔', value: 'jottings', path: '/jottings' },
    { label: '畅言', value: 'leaveWord', path: '/leaveWord' }
  ])
  const useProps = defineProps({
    isMobile: {
      type: Boolean,
      default: false
    }
  })
  const userStore = useUserStore()
  onMounted(() => {
    userStore.isLogin && handleList()
  });

  const handleJump = (path: string) => {
    if (path) redirectTo(path)
    else ElMessage({
      message: '当前模块暂未开放，敬请期待！',
      type: 'info',
      plain: true,
    })
  }
  watch(() => userStore.isLogin, (isLogin) => {
    if (isLogin) {
      handleList()
    }
  })
  const handleList = () => {
    if (!list.value.some(item => item.value === 'writeEdit')) {
      list.value.push({ label: '提笔编辑', value: 'writeEdit', path: '/editor' })
    }
  }
</script>
<script lang="ts">
export default {
  name: 'HeaderLayout'
}
</script>

<style scoped lang="less">
.header_content {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 0 calc((100% - 1200px + 16px) / 2);
  height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: rgba(#000, .1);
  font-weight: bold;
  .header_title {
    font-size: 22px;
    margin-left: 16px;
  }
  .header_list {
    //font-size: 16px;
    display: flex;
    &_item {
      flex: 1;
      min-width: 90px;
      text-align: center;
      cursor: pointer;
      &.mobile_item {
        min-width: 50px;
      }
    }
  }
}
</style>

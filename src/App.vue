<!---->
<template>
  <div class="container">
    <header-layout ref="headerLayoutRef" :isMobile="isMobileOrPc()" />
    <div
      class="container_content"
      :style="{
        display: isMobileOrPc() ? 'block' : 'flex',
        height: isMobileOrPc() ? '86vh' : '100vh',
      }"
    >
      <template v-if="isMobileOrPc()">
        <userLayout
          v-if="route.name !== 'Article'"
          class="user_layout"
          :isMobile="true"
          style="
            width: calc(100vw - 32px);
            margin-right: 16px;
            max-height: 27vh;
          "
        />
        <div class="layout">
          <router-view />
        </div>
      </template>
      <template v-else>
        <div class="layout">
          <router-view />
        </div>
        <userLayout
          class="user_layout"
          :style="{ maxHeight: isMobileOrPc() ? '35vh' : '41vh' }"
        />
      </template>
    </div>
    <BgLayer />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import BgLayer from "./components/BackgroundLayer.vue";
import HeaderLayout from "./components/headerLayout.vue";
import UserLayout from "./components/userLayout.vue";
import { isMobileOrPc } from "@/utils/utils";
import { commonApi } from "@/api";

// 移动端 rem 单位适配
if (isMobileOrPc()) {
  // width * 100 / 750 = width / 7.5
  // 1rem = 100px
  const width = window.screen.width;
  window.document.getElementsByTagName("html")[0].style.fontSize = `${
    width / 12.5
  }px`;
}

// 状态定义
const state = reactive({
  isShowNav: false,
  isShowSlider: false,
});

// 路由相关
const route = useRoute();

// 路由变化处理函数
const routeChange = (val: typeof route): void => {
  const referrer = document.getElementById("referrer");
  if (val.path === "/") {
    state.isShowNav = false;
    referrer?.setAttribute("content", "always");
  } else {
    state.isShowNav = true;
    referrer?.setAttribute("content", "never");
  }

  // 原代码中 navs 是空数组，保持原有逻辑
  const navs: string[] = [];
  if (navs.includes(val.path)) {
    state.isShowSlider = true;
  } else {
    state.isShowSlider = false;
  }

  // 移动端强制隐藏侧边栏
  if (isMobileOrPc()) {
    state.isShowSlider = false;
  }
};

// 监听路由变化
watch(
  () => route.path,
  () => routeChange(route),
  { immediate: false }
);
// 组件挂载时初始化路由状态
onMounted(() => {
  routeChange(route);
  let u = navigator.userAgent;
  let visitType = "PC";
  let isHarmonyOS = /HarmonyOS|OpenHarmony|ArkWeb/.test(u);
  if (
    u.indexOf("Android") < 0 &&
    u.indexOf("Linux") < 0 &&
    u.indexOf("iPhone") < 0 &&
    u.indexOf("Windows Phone") < 0 &&
    u.indexOf("MiniProgram") < 0 &&
    u.indexOf("Phone") < 0 &&
    u.indexOf("Harmony") < 0 &&
    !isHarmonyOS // 新增：排除鸿蒙系统
  ) {
    visitType = "PC";
  } else {
    visitType = "MOBILE";
  }
  commonApi
    .getUserLocation({ visitType })
    .then((res: any) => {
      console.log("User location:", res);
    })
    .catch((err: any) => {
      console.error("Error fetching user location:", err);
    });
});

// 暴露给模板的变量
// defineExpose({
//   state,
//   routeChange,
// });
</script>

<style lang="less">
@import url("./less/monokai_sublime.less");
@import url("./less/index.less");
@import url("./less/mobile.less");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 0;

  .container_content {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100vh;
    top: 100px;
    left: 0;
    padding: 0 calc((100% - 1200px + 16px) / 2);
    display: flex;
    overflow: auto;
    & > div {
      height: auto;
    }

    .layout {
      position: relative;
      z-index: 1;
      flex: 3;
    }

    .user_layout {
      position: relative;
      z-index: 1;
      margin-left: 16px;
      flex: 1;
      background: rgba(#fff, 0.5);
    }
  }
}

img {
  vertical-align: bottom;
}
</style>

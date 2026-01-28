<template>
  <div class="layout_content" :class="[{'mobile_layout': useProps.isMobile}]">
    <div class="layout_content_header">
      <div class="icon_user" @click="handleShowHide"></div>
    </div>
    <div class="layout_content_des" v-html="self_content"></div>
  </div>
</template>

<script lang="ts" setup>
  import { commonApi } from "@/api";
  import { onMounted, ref } from "vue";
  import { useUserStore } from "@stores/user";
  const useProps = defineProps({
    isMobile: {
      type: Boolean,
      default: false
    }
  })
  const self_content = ref(`
          寒灯纸上，梨花雨凉<br/><br/>
          梦见你的另一层含义呀，<br/><br/>
          是你说过的，在我梦到你的那一刻，你也正梦着我。<br/><br/>
      `);
  onMounted(() => {
    commonApi.getSelfDes({}).then((res: any) => {
      self_content.value = res.data.descript || self_content.value
    })
  });
  const emit = defineEmits(['showHide'])
  const userStore = useUserStore()
  const clickTotal = ref(0)
  const handleShowHide = () => {
    clickTotal.value++
    if (clickTotal.value >= 5) {
      console.log(emit)
      userStore.setAdminStatus(true)
      emit('showHide')
      clickTotal.value = 0
    }
  }
</script>
<script lang="ts">
export default {
  name: 'UserLayout'
}
</script>


<style scoped lang="less">
.layout_content {
  width: 100%;
  padding-bottom: 16px;
  &_header {
    background-image: url(@/assets/self_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 102px;
    position: relative;
    .icon_user {
      width: 64px;
      height: 64px;
      position: absolute;
      bottom: -32px;
      left: calc(50% - 32px);
      border: 3px solid #fff;
      border-radius: 50%;
      background: url(../assets/icon_user.png) 100%;
      background-size: 64px 64px;
    }
  }
  &.mobile_layout {
    width: calc(100vw - 16px);
  }
  &_des {
    padding: 36px 16px 0;
  }
}
</style>

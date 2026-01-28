<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 200px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>

<script setup>
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import "@wangeditor/editor/dist/css/style.css";
  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()

  // 内容 HTML
  const valueHtml = ref('')

  // 模式（default 或 simple）
  const mode = ref('default')

  // 工具栏配置
  const toolbarConfig = ref({})

  // 编辑器配置
  const editorConfig = ref({
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: '/YLApi/article/upload',
        fieldName: 'file',
      }
    }
  })

  // 模拟 ajax 异步获取内容（如需使用可取消注释并补充逻辑）
  // onMounted(() => {
  //   // 示例：从接口获取内容并赋值
  //   // fetch('/api/get-content')
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     valueHtml.value = data.content
  //   //   })
  // })

  // 编辑器创建时触发 - 记录实例
  const handleCreated = (editor) => {
    editorRef.value = editor // 重要：保存编辑器实例
  }

  // 编辑器内容变化时触发
  const handleChange = (editor) => {
    console.log('editor.getHtml()', editor.getHtml())
    console.log('editor.getText()', editor.getText())
  }
  const clearContent = () => {
    const editor = editorRef.value
    editor.clear()
  }

  // 组件销毁时销毁编辑器（避免内存泄漏）
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor) {
      editor.destroy()
      editorRef.value = null // 清空引用
    }
  })
  defineExpose({
    valueHtml,
    clearContent
  })
</script>

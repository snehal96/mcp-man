<template>
  <div ref="editorContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'

const props = defineProps<{
  modelValue: string
  language?: string
  theme?: string
  options?: any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorContainer = ref<HTMLElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  if (!editorContainer.value) return

  // Initialize Monaco Editor
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language || 'python',
    theme: props.theme || 'vs-dark',
    ...props.options,
  })

  // Listen to content changes
  editor.onDidChangeModelContent(() => {
    if (editor) {
      emit('update:modelValue', editor.getValue())
    }
  })

  // Handle window resize
  const resizeObserver = new ResizeObserver(() => {
    editor?.layout()
  })

  resizeObserver.observe(editorContainer.value)

  onBeforeUnmount(() => {
    resizeObserver.disconnect()
  })
})

onBeforeUnmount(() => {
  editor?.dispose()
})

watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})
</script>


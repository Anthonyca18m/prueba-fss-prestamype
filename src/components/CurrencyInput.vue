<template>
    <div class="currency-input-box d-flex justify-content-between align-items-center">
      <div class="label text-primary bg-light fw-semibold">
        {{ label }}
      </div>
  
      <div class="text-end flex-fill">
        <div class="small text-muted" style="margin-right: .7rem;">{{ textRight }}</div>
        <input
          :value="readonly ? displayValue : inputValue"
          :readonly="readonly"
          @input="onInput"
          @keypress="onKeyPress"
          class="form-control text-end fw-bold border-0 py-0 bg-transparent"
          :placeholder="placeholder"
          inputmode="decimal"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  
  const props = defineProps<{
    label: string
    symbol?: string
    modelValue: number
    readonly?: boolean
    textRight?: string
    placeholder?: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>()
  
  const inputValue = ref(props.modelValue.toString())
  
  watch(
    () => props.modelValue,
    (val) => {
      if (val !== parseFloat(inputValue.value)) {
        inputValue.value = val.toString()
      }
    }
  )
  
  const displayValue = computed(() => {
    const value = props.modelValue ?? 0
    const symbol = props.symbol ?? '$'
    return `${symbol} ${value.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  })
  
  const onKeyPress = (e: KeyboardEvent) => {
    const allowed = /[0-9.,]/
    if (!allowed.test(e.key)) {
      e.preventDefault()
    }
  }
  
  const onInput = (e: Event) => {
    const input = e.target as HTMLInputElement
    let raw = input.value.replace(',', '.')
    let parsed = parseFloat(raw)
  
    if (isNaN(parsed)) parsed = 0
  
    inputValue.value = raw
    emit('update:modelValue', parsed)
  }
  </script>
  
  <style scoped>
  .currency-input-box {
    border: 2px solid #7735ff;
    border-radius: 10px;
    background-color: white;
    min-width: 280px;
    width: 100%;
  }
  
  .label {
    min-width: 100px;
    padding: 12px 16px;
    border-radius: 1rem 0 0 1rem;
  }
  
  input.form-control:focus {
    box-shadow: none;
  }
  </style>
  
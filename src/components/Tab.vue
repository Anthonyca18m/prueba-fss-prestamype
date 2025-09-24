<template>
    <div @click="onClick" class="col text-center py-2 cursor-pointer" role="button">
        <div class="text-muted">{{ label }}</div>
        <div class="fw-bold" :class="{ 'text-primary': active }">
            {{ value }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
    const props = defineProps<{
        label: string
        value: string | number
        active?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'click'): void
    }>()

    const onClick = () => {
        emit('click')
    }
</script>
  
<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
  
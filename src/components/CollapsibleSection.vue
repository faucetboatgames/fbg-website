<!-- src/components/CollapsibleSection.vue -->
<template>
  <div class="collapsible-section">
    <div class="section-header" @click="toggleSection">
      <h2>{{ title }}</h2>
      <transition name="rotate">
        <span class="toggle-icon" :class="{ 'is-expanded': isExpanded }">▼</span>
      </transition>
    </div>
    <transition name="expand">
      <div v-show="isExpanded" class="section-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const isExpanded = ref(true)

const toggleSection = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped lang="scss">
.collapsible-section {
  margin: 2rem 0;
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(26, 35, 126, 0.2);
    cursor: pointer;
    border-radius: 8px;
    
    &:hover {
      background: rgba(26, 35, 126, 0.3);
    }
  }

  .toggle-icon {
    transition: transform 0.3s ease;
    
    &.is-expanded {
      transform: rotate(180deg);
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.3s ease;
}
</style>

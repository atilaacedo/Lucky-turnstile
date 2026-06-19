<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'idle' | 'processing' | 'allowed' | 'denied'
}>()

const displayConfig = computed(() => {
  switch (props.status) {
    case 'idle':
      return {
        text: 'Aproxime seu Crachá',
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
        bgColor: 'bg-slate-800/50',
        textColor: 'text-slate-300',
        borderColor: 'border-slate-600',
        animation: ''
      }
    case 'processing':
      return {
        text: 'Processando...',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        bgColor: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500',
        animation: 'animate-pulse'
      }
    case 'allowed':
      return {
        text: 'ACESSO PERMITIDO',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-emerald-500/20',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-500',
        animation: ''
      }
    case 'denied':
      return {
        text: 'ACESSO NEGADO',
        icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-rose-500/20',
        textColor: 'text-rose-400',
        borderColor: 'border-rose-500',
        animation: 'animate-shake'
      }
  }
})
</script>

<template>
  <div 
    class="flex flex-col items-center justify-center p-12 rounded-3xl border-2 backdrop-blur-sm transition-all duration-300 w-full max-w-lg shadow-2xl"
    :class="[
      displayConfig.bgColor, 
      displayConfig.borderColor, 
      displayConfig.animation,
      status === 'allowed' ? 'shadow-emerald-500/20' : '',
      status === 'denied' ? 'shadow-rose-500/20' : '',
    ]"
  >
    <div class="mb-6">
      <svg 
        class="w-24 h-24 transition-colors duration-300"
        :class="displayConfig.textColor"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="displayConfig.icon" />
      </svg>
    </div>
    <h2 
      class="text-4xl font-extrabold tracking-tight text-center transition-colors duration-300 uppercase"
      :class="displayConfig.textColor"
    >
      {{ displayConfig.text }}
    </h2>
    <p v-if="status === 'idle'" class="mt-4 text-slate-400 text-sm font-medium animate-pulse">
      (Aguardando leitura...)
    </p>
  </div>
</template>

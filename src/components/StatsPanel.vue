<script setup lang="ts">
import { useHistoryStore } from '../stores/history'
import { storeToRefs } from 'pinia'

const historyStore = useHistoryStore()
const { greenCount, redCount, totalScans, luckRate } = storeToRefs(historyStore)
</script>

<template>
  <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-xl">
    <h3 class="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
      <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      Estatísticas do Dia
    </h3>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center">
        <span class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Permitidos</span>
        <span class="text-3xl font-black text-emerald-400">{{ greenCount }}</span>
      </div>
      <div class="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center">
        <span class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Negados</span>
        <span class="text-3xl font-black text-rose-400">{{ redCount }}</span>
      </div>
    </div>

    <div class="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 relative overflow-hidden">
      <!-- Decorative background glow -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
      
      <div class="relative z-10">
        <span class="block text-indigo-300 text-sm font-semibold mb-1">Taxa de Sorte Hoje</span>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-black text-indigo-400 tracking-tighter">{{ luckRate }}</span>
          <span class="text-2xl font-bold text-indigo-500">%</span>
        </div>
        
        <!-- Progress bar -->
        <div class="w-full bg-slate-900/80 h-2 mt-4 rounded-full overflow-hidden">
          <div 
            class="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${luckRate}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <span class="text-slate-500 text-xs">Total de leituras: <strong class="text-slate-300">{{ totalScans }}</strong></span>
    </div>
  </div>
</template>

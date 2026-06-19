<script setup lang="ts">
import { useHistoryStore } from '../stores/history'
import { storeToRefs } from 'pinia'

const historyStore = useHistoryStore()
const { recentScans } = storeToRefs(historyStore)
</script>

<template>
  <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 w-full max-w-sm h-[400px] flex flex-col shadow-xl">
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
      <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Histórico Recente
      </h3>
      <span class="text-xs font-semibold px-2.5 py-1 bg-slate-700 text-slate-300 rounded-full">
        Últimos {{ recentScans.length }}
      </span>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
      <div v-if="recentScans.length === 0" class="flex flex-col items-center justify-center h-full text-slate-500">
        <svg class="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm">Nenhum registro hoje</p>
      </div>
      
      <TransitionGroup name="list">
        <div 
          v-for="(scan, index) in recentScans" 
          :key="scan.timestamp + scan.id + index"
          class="flex items-center justify-between p-3 rounded-xl border transition-all"
          :class="scan.isLucky ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'"
        >
          <div class="flex items-center gap-3">
            <div 
              class="w-2 h-2 rounded-full"
              :class="scan.isLucky ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'"
            ></div>
            <div class="flex flex-col">
              <span class="font-mono text-sm font-semibold" :class="scan.isLucky ? 'text-emerald-300' : 'text-rose-300'">
                ID: {{ scan.id }}
              </span>
              <span class="text-xs text-slate-400 font-medium">{{ scan.timestamp }}</span>
            </div>
          </div>
          <div>
            <span v-if="scan.isLucky" class="text-xs font-bold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md uppercase">
              Sorte
            </span>
            <span v-else class="text-xs font-bold px-2 py-1 bg-rose-500/20 text-rose-400 rounded-md uppercase">
              Azar
            </span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.8);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 1);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

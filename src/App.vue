<script setup lang="ts">
import { ref } from 'vue'
import ReaderDisplay from './components/ReaderDisplay.vue'
import RecentHistory from './components/RecentHistory.vue'
import StatsPanel from './components/StatsPanel.vue'
import { useRFIDReader } from './composables/useRFIDReader'
import { useGameLogic } from './composables/useGameLogic'
import { useAudio } from './composables/useAudio'
import { useHistoryStore } from './stores/history'

type StatusType = 'idle' | 'processing' | 'allowed' | 'denied'

const status = ref<StatusType>('idle')
const { checkLuck } = useGameLogic()
const { playSuccess, playError } = useAudio()
const historyStore = useHistoryStore()

// Initialize RFID Reader listener
useRFIDReader(async (cardId) => {
  // If we're already processing something, ignore subsequent fast scans
  if (status.value !== 'idle') return

  status.value = 'processing'
  
  // Artificial delay to build suspense (1.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500))

  const isLucky = checkLuck(cardId)
  
  if (isLucky) {
    status.value = 'allowed'
    playSuccess()
  } else {
    status.value = 'denied'
    playError()
  }

  // Update history store
  historyStore.addScan(cardId, isLucky)

  // Reset back to idle after 3 seconds
  setTimeout(() => {
    status.value = 'idle'
  }, 3000)
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
    <!-- Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
      <div class="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px]"></div>
    </div>

    <!-- Header -->
    <header class="relative z-10 p-6 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Catraca da Sorte
          </h1>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <div class="flex flex-col lg:flex-row gap-10 items-start justify-center">
        
        <!-- Left Column: Status Display -->
        <div class="w-full lg:w-7/12 flex flex-col items-center justify-center min-h-[500px]">
          <ReaderDisplay :status="status" />
          
          <div class="mt-10 text-center max-w-md">
            <p class="text-slate-400 text-sm leading-relaxed">
              Aproxime seu cartão de acesso no leitor. Se você tiver sorte, receberá permissão!
            </p>
          </div>
        </div>

        <!-- Right Column: Stats & History -->
        <div class="w-full lg:w-5/12 flex flex-col items-center lg:items-start gap-8">
          <StatsPanel />
          <RecentHistory />
        </div>

      </div>
    </main>
  </div>
</template>

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface ScanResult {
  id: string
  isLucky: boolean
  timestamp: string
}

export const useHistoryStore = defineStore('history', () => {
  const greenCount = ref(0)
  const redCount = ref(0)
  const recentScans = ref<ScanResult[]>([])
  
  // Try to load from localStorage
  const savedHistory = localStorage.getItem('luckyTurnstileHistory')
  if (savedHistory) {
    try {
      const parsed = JSON.parse(savedHistory)
      greenCount.value = parsed.greenCount || 0
      redCount.value = parsed.redCount || 0
      recentScans.value = parsed.recentScans || []
      
      // Optional daily reset check based on the first item or simple day check
      // For simplicity we won't strictly enforce a date change here, but one could check if 
      // the date of the last scan is different from today.
    } catch (e) {
      console.error('Failed to parse history', e)
    }
  }

  // Persist state on changes
  watch([greenCount, redCount, recentScans], () => {
    localStorage.setItem('luckyTurnstileHistory', JSON.stringify({
      greenCount: greenCount.value,
      redCount: redCount.value,
      recentScans: recentScans.value
    }))
  }, { deep: true })

  const totalScans = computed(() => greenCount.value + redCount.value)
  const luckRate = computed(() => {
    if (totalScans.value === 0) return 0
    return Math.round((greenCount.value / totalScans.value) * 100)
  })

  function addScan(cardId: string, isLucky: boolean) {
    // Mask the card ID for privacy (e.g., ***4892)
    const maskedId = cardId.length > 4 
      ? '***' + cardId.slice(-4) 
      : '***' + cardId
      
    if (isLucky) {
      greenCount.value++
    } else {
      redCount.value++
    }

    recentScans.value.unshift({
      id: maskedId,
      isLucky,
      timestamp: new Date().toLocaleTimeString()
    })

    // Keep only the last 20 scans for UI
    if (recentScans.value.length > 20) {
      recentScans.value.pop()
    }
  }

  function resetHistory() {
    greenCount.value = 0
    redCount.value = 0
    recentScans.value = []
  }

  return {
    greenCount,
    redCount,
    recentScans,
    totalScans,
    luckRate,
    addScan,
    resetHistory
  }
})

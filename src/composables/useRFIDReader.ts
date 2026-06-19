import { ref, onMounted, onUnmounted } from 'vue'

export function useRFIDReader(onScan: (cardId: string) => void) {
  const currentInput = ref('')
  let lastKeyTime = 0
  const KEYSTROKE_DELAY_THRESHOLD = 50 
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    const currentTime = Date.now()

    if (currentTime - lastKeyTime > KEYSTROKE_DELAY_THRESHOLD && currentInput.value.length > 0) {
      currentInput.value = ''
    }
    
    lastKeyTime = currentTime

    if (e.key === 'Enter') {
      if (currentInput.value.length > 0) {
        onScan(currentInput.value)
        currentInput.value = ''
      }
      return
    }

    if (e.key.length === 1) {
      currentInput.value += e.key
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    currentInput
  }
}

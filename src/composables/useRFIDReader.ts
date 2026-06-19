import { ref, onMounted, onUnmounted } from 'vue'

export function useRFIDReader(onScan: (cardId: string) => void) {
  const currentInput = ref('')
  let lastKeyTime = 0
  const KEYSTROKE_DELAY_THRESHOLD = 50 // ms - wedge readers type very fast

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore if focus is in an input field
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    const currentTime = Date.now()

    // If it's been a while since the last key, reset the input buffer
    // This helps avoid standard typing from being interpreted as a barcode scan
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

    // Capture standard visible characters
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

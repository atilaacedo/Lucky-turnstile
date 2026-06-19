import { ref } from 'vue'

export function useAudio() {
  const successAudio = ref<HTMLAudioElement | null>(null)
  const errorAudio = ref<HTMLAudioElement | null>(null)

  // Initialize audio objects
  // The browser will load these if they exist in the public directory
  try {
    successAudio.value = new Audio('/success.mp3')
    errorAudio.value = new Audio('/error.mp3')
  } catch (e) {
    console.warn('Audio initialization failed', e)
  }

  // Fallback beep using Web Audio API in case the files don't exist
  const playBeep = (frequency: number, type: OscillatorType, duration: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      oscillator.type = type
      oscillator.frequency.value = frequency
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      oscillator.start()
      
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration)
      
      setTimeout(() => {
        oscillator.stop()
        audioCtx.close()
      }, duration * 1000)
    } catch (e) {
      console.error('Web Audio API not supported', e)
    }
  }

  const playSuccess = async () => {
    if (successAudio.value) {
      try {
        successAudio.value.currentTime = 0
        await successAudio.value.play()
      } catch (e) {
        console.warn('Could not play success.mp3, falling back to beep', e)
        playBeep(800, 'sine', 0.5) // High beep
      }
    } else {
      playBeep(800, 'sine', 0.5)
    }
  }

  const playError = async () => {
    if (errorAudio.value) {
      try {
        errorAudio.value.currentTime = 0
        await errorAudio.value.play()
      } catch (e) {
        console.warn('Could not play error.mp3, falling back to beep', e)
        playBeep(200, 'sawtooth', 0.5) // Low buzz
      }
    } else {
      playBeep(200, 'sawtooth', 0.5)
    }
  }

  return {
    playSuccess,
    playError
  }
}

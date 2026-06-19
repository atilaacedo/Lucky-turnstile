export function useGameLogic() {
  /**
   * Generates a simple hash from a string.
   */
  const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash 
    }
    return Math.abs(hash)
  }

  /**
   * Determines if the card is lucky based on the cardId and the current date.
   * This makes the result deterministic for a given card on a given day.
   */
  const checkLuck = (cardId: string): boolean => {
    const today = new Date()
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const combinedString = `${cardId}-${dateString}`
    const hashValue = hashString(combinedString)
    return (hashValue % 2) === 0
  }

  return {
    checkLuck
  }
}

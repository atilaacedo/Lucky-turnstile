export function useGameLogic() {
  /**
   * Generates a simple hash from a string.
   */
  const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  /**
   * Determines if the card is lucky based on the cardId and the current date.
   * This makes the result deterministic for a given card on a given day.
   */
  const checkLuck = (cardId: string): boolean => {
    const today = new Date()
    // Create a date string like "YYYY-MM-DD"
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    
    // Combine date and card ID
    const combinedString = `${dateString}-${cardId}`
    
    // Hash the combination
    const hash = hashString(combinedString)
    
    // Use modulo to determine luck (e.g., 50% chance if modulo 2)
    // You can adjust this to change the probability. Currently 50% chance.
    return hash % 2 === 0
  }

  return {
    checkLuck
  }
}

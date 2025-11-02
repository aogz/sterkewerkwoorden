import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'dutch-verbs-streak'
const MIN_VERBS_PER_DAY = 5

// Get today's date string in YYYY-MM-DD format
function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

// Get date string for a given date
function getDateString(date) {
  return date.toISOString().split('T')[0]
}

export function useStreakTracker() {
  const [streakData, setStreakData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return { dailyPractice: {}, currentStreak: 0, longestStreak: 0 }
      }
    }
    return { dailyPractice: {}, currentStreak: 0, longestStreak: 0 }
  })

  // Calculate streak from daily practice data
  const calculateStreak = useCallback((dailyPractice) => {
    if (!dailyPractice || Object.keys(dailyPractice).length === 0) {
      return 0
    }

    const today = getTodayString()
    const sortedDates = Object.keys(dailyPractice)
      .filter(date => {
        const dayData = dailyPractice[date]
        const count = typeof dayData === 'object' ? (dayData.count || (dayData.verbs?.length || 0)) : dayData
        return count >= MIN_VERBS_PER_DAY
      })
      .sort((a, b) => b.localeCompare(a)) // Sort descending (most recent first)

    if (sortedDates.length === 0) {
      return 0
    }

    // Check if today or yesterday is in the list
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayString = getDateString(yesterday)

    // Determine the starting point for the streak
    let startDate = null
    if (sortedDates.includes(today)) {
      startDate = today
    } else if (sortedDates.includes(yesterdayString)) {
      startDate = yesterdayString
    } else {
      return 0
    }

    // Calculate consecutive days backwards from start date
    let streak = 0
    let currentDate = new Date(startDate)
    
    while (true) {
      const currentDateString = getDateString(currentDate)
      if (sortedDates.includes(currentDateString)) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }, [])

  // Record practice for a verb today
  const recordVerbPractice = useCallback((verbIndex) => {
    setStreakData(prev => {
      const today = getTodayString()
      const todayData = prev.dailyPractice[today] || { verbs: new Set() }
      
      // Convert Set to Array for JSON serialization
      const verbsArray = Array.isArray(todayData.verbs) 
        ? new Set(todayData.verbs) 
        : (todayData.verbs instanceof Set ? todayData.verbs : new Set())
      
      verbsArray.add(verbIndex)
      
      const newDailyPractice = {
        ...prev.dailyPractice,
        [today]: {
          verbs: Array.from(verbsArray),
          count: verbsArray.size
        }
      }

      // Clean up old data (keep only last 90 days for performance)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - 90)
      const cutoffString = getDateString(cutoffDate)
      
      const cleanedPractice = {}
      Object.keys(newDailyPractice).forEach(date => {
        if (date >= cutoffString) {
          cleanedPractice[date] = newDailyPractice[date]
        }
      })

      const newStreak = calculateStreak(cleanedPractice)
      const longestStreak = Math.max(prev.longestStreak || 0, newStreak)

      return {
        dailyPractice: cleanedPractice,
        currentStreak: newStreak,
        longestStreak: longestStreak
      }
    })
  }, [calculateStreak])

  // Update streak calculation periodically (e.g., when day changes)
  useEffect(() => {
    const updateStreak = () => {
      setStreakData(prev => {
        const newStreak = calculateStreak(prev.dailyPractice)
        return {
          ...prev,
          currentStreak: newStreak
        }
      })
    }

    // Update streak immediately
    updateStreak()

    // Update streak when day changes (check every hour)
    const interval = setInterval(updateStreak, 3600000) // 1 hour
    
    return () => clearInterval(interval)
  }, [calculateStreak])

  // Save to localStorage whenever streakData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streakData))
  }, [streakData])

  return {
    currentStreak: streakData.currentStreak || 0,
    longestStreak: streakData.longestStreak || 0,
    recordVerbPractice
  }
}


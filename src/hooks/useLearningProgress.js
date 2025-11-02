import { useState, useEffect } from 'react'

const STORAGE_KEY = 'dutch-verbs-progress'

export function useLearningProgress(totalVerbs) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {}
      }
    }
    return {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markAsLearned = (verbIndex) => {
    setProgress(prev => ({
      ...prev,
      [verbIndex]: { ...prev[verbIndex], learned: true }
    }))
  }

  const recordPractice = (verbIndex, correct) => {
    setProgress(prev => {
      const current = prev[verbIndex] || {}
      const correctCount = (current.practiceCorrect || 0) + (correct ? 1 : 0)
      const totalCount = (current.practiceTotal || 0) + 1
      
      return {
        ...prev,
        [verbIndex]: {
          ...current,
          learned: current.learned || false,
          practiceCorrect: correctCount,
          practiceTotal: totalCount,
          mastered: correctCount >= 3 && correctCount / totalCount >= 0.8
        }
      }
    })
  }

  const resetProgress = () => {
    setProgress({})
    localStorage.removeItem(STORAGE_KEY)
  }

  const getVerbStatus = (verbIndex) => {
    const verbProgress = progress[verbIndex]
    if (!verbProgress || !verbProgress.learned) return 'new'
    if (verbProgress.mastered) return 'mastered'
    return 'learning'
  }

  const getStatistics = () => {
    const learned = Object.values(progress).filter(p => p.learned).length
    const mastered = Object.values(progress).filter(p => p.mastered).length
    const totalPracticed = Object.values(progress).filter(p => p.practiceTotal).length
    const totalCorrect = Object.values(progress).reduce((sum, p) => sum + (p.practiceCorrect || 0), 0)
    const totalAttempts = Object.values(progress).reduce((sum, p) => sum + (p.practiceTotal || 0), 0)
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

    return {
      learned,
      mastered,
      totalPracticed,
      accuracy,
      totalVerbs
    }
  }

  return {
    progress,
    markAsLearned,
    recordPractice,
    resetProgress,
    getVerbStatus,
    getStatistics
  }
}


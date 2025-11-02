import { useState, useEffect, useCallback } from 'react'
import FlashCard from './components/FlashCard'
import PracticeCard from './components/PracticeCard'
import VerbList from './components/VerbList'
import { verbs } from './data/verbs'
import { useLearningProgress } from './hooks/useLearningProgress'
import { useStreakTracker } from './hooks/useStreakTracker'

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function App() {
  const [mode, setMode] = useState('learn') // 'learn' or 'practice'
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0)
  const { markAsLearned, recordPractice, getVerbStatus, getStatistics } = useLearningProgress(verbs.length)
  const { currentStreak, recordVerbPractice } = useStreakTracker()

  const [learnOrder, setLearnOrder] = useState(() => shuffleArray(verbs.map((_, i) => i)))
  const [practiceOrder, setPracticeOrder] = useState(() => shuffleArray(verbs.map((_, i) => i)))

  // Get the actual verb index based on mode
  const actualVerbIndex = mode === 'learn' 
    ? learnOrder[currentVerbIndex] 
    : practiceOrder[currentVerbIndex] || currentVerbIndex

  const currentVerb = verbs[actualVerbIndex]
  const stats = getStatistics()

  // Reshuffle when entering learn mode
  useEffect(() => {
    if (mode === 'learn') {
      setLearnOrder(shuffleArray(verbs.map((_, i) => i)))
    } else {
      setPracticeOrder(shuffleArray(verbs.map((_, i) => i)))
    }
    setCurrentVerbIndex(0)
  }, [mode])

  const nextVerb = useCallback(() => {
    setCurrentVerbIndex(prev => {
      if (prev < verbs.length - 1) {
        return prev + 1
      }
      return prev
    })
  }, [])

  const prevVerb = useCallback(() => {
    setCurrentVerbIndex(prev => {
      if (prev > 0) {
        return prev - 1
      }
      return prev
    })
  }, [])

  const goToVerb = (actualIndex) => {
    // Find the position of this verb in the current mode's order
    const order = mode === 'learn' ? learnOrder : practiceOrder
    const position = order.indexOf(actualIndex)
    if (position !== -1) {
      setCurrentVerbIndex(position)
    }
  }

  const handlePracticeCorrect = () => {
    recordPractice(actualVerbIndex, true)
    recordVerbPractice(actualVerbIndex)
  }

  const handlePracticeIncorrect = () => {
    recordPractice(actualVerbIndex, false)
    recordVerbPractice(actualVerbIndex)
  }

  const handlePracticeNext = () => {
    if (currentVerbIndex < verbs.length - 1) {
      setCurrentVerbIndex(currentVerbIndex + 1)
    } else {
      // Loop back to start
      setCurrentVerbIndex(0)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode === 'practice') return // Practice mode handles its own keyboard
      
      if (e.key === 'ArrowRight' && currentVerbIndex < verbs.length - 1) {
        nextVerb()
      } else if (e.key === 'ArrowLeft' && currentVerbIndex > 0) {
        prevVerb()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mode, currentVerbIndex, nextVerb, prevVerb])

  return (
    <div className="h-full w-full flex overflow-hidden">
      <VerbList 
        verbs={verbs}
        currentIndex={actualVerbIndex}
        onVerbClick={goToVerb}
        getVerbStatus={getVerbStatus}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="text-center py-4 px-8 bg-white border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            🇳🇱 Dutch Verb Drill
          </h1>
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <button
              onClick={() => setMode('learn')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'learn'
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📚 Learn
            </button>
            <button
              onClick={() => setMode('practice')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'practice'
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✏️ Practice
            </button>
          </div>

          {/* Statistics */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="text-gray-600">
              Learned: <strong className="text-gray-800">{stats.learned}/{stats.totalVerbs}</strong>
            </span>
            <span className="text-gray-600">
              Mastered: <strong className="text-gray-800">{stats.mastered}</strong>
            </span>
            {stats.accuracy > 0 && (
              <span className="text-gray-600">
                Accuracy: <strong className="text-gray-800">{stats.accuracy}%</strong>
              </span>
            )}
            <div className="group relative">
              <span className="text-gray-600 cursor-help">
                {currentStreak > 0 ? '🔥' : '📅'} Streak: <strong className="text-gray-800">{currentStreak}</strong>
              </span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="mb-2 font-semibold text-sm">Practice Streak</p>
                <p className="mb-2">Practice at least 5 different verbs each day to maintain your streak. Keep going!</p>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          <div className="w-full max-w-5xl">
            {mode === 'learn' ? (
              <FlashCard
                verb={currentVerb}
                currentIndex={currentVerbIndex}
                totalVerbs={verbs.length}
                onPrev={prevVerb}
                onNext={nextVerb}
              />
            ) : (
              <PracticeCard
                verb={currentVerb}
                onCorrect={handlePracticeCorrect}
                onIncorrect={handlePracticeIncorrect}
                currentIndex={currentVerbIndex}
                totalVerbs={verbs.length}
                onNext={handlePracticeNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


import { useState } from 'react'
import { usePracticeSentences } from '../hooks/usePracticeSentences'

function PracticeCard({ verb, onCorrect, onIncorrect, currentIndex, totalVerbs, onNext }) {
  const { sentences, loading, error: apiError, apiAvailable } = usePracticeSentences(verb)
  const [pastSimpleAnswer, setPastSimpleAnswer] = useState('')
  const [pastParticipleAnswer, setPastParticipleAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [revealPastSimple, setRevealPastSimple] = useState(false)
  const [revealPastParticiple, setRevealPastParticiple] = useState(false)

  const checkAnswers = () => {
    const pastSimpleCorrect = pastSimpleAnswer.toLowerCase().trim() === verb.pastSimple.toLowerCase()
    const pastParticipleCorrect = pastParticipleAnswer.toLowerCase().trim() === verb.pastParticiple.toLowerCase()
    
    // If either answer was revealed, it doesn't count as correct
    const hasRevealed = revealPastSimple || revealPastParticiple
    const correct = pastSimpleCorrect && pastParticipleCorrect && !hasRevealed
    
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      onCorrect()
      setTimeout(() => {
        handleNext()
      }, 1500)
    } else {
      onIncorrect()
    }
  }

  const handleNext = () => {
    setPastSimpleAnswer('')
    setPastParticipleAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setRevealPastSimple(false)
    setRevealPastParticiple(false)
    onNext()
  }

  const handleRevealPastSimple = () => {
    setRevealPastSimple(true)
    setPastSimpleAnswer(verb.pastSimple)
  }

  const handleRevealPastParticiple = () => {
    setRevealPastParticiple(true)
    setPastParticipleAnswer(verb.pastParticiple)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      checkAnswers()
    }
  }

  return (
    <div className="fade-in">
      <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 transition-all duration-300">
        {/* Infinitive (Always Visible) */}
        <div className="mb-4 md:mb-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1 md:mb-2">Infinitive (Hele Werkwoord)</p>
          <h2 className="text-3xl md:text-6xl font-black text-gray-900 transition-all duration-500">
            {verb.infinitive}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2 font-semibold">{verb.english}</p>
        </div>

        <div className="h-px bg-gray-200 my-3 md:my-5" />
        
        {/* Practice Sentences with Blanks */}
        {!loading && apiError && apiAvailable === false && (
          <div className="mb-5 text-center">
            <div className="group relative inline-block">
              <p className="text-sm text-gray-400 italic cursor-help underline decoration-dotted">
                Sentences unavailable - using direct input
              </p>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="mb-2 font-semibold text-sm">Prompt API not enabled</p>
                <p className="mb-2">Enable Prompt API in chrome://flags for sentence-based practice.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
          {/* Simple Past Sentence */}
          <div className="group">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5 md:mb-2">Simple Past (O.V.T.)</p>
            <div className="space-y-2 md:space-y-3">
              {/* Input field - always displayed */}
              <input
                type="text"
                value={pastSimpleAnswer}
                onChange={(e) => setPastSimpleAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={showResult || revealPastSimple}
                className={`w-full px-3 md:px-4 py-2 md:py-3 text-lg md:text-xl font-bold text-center rounded-lg border-2 transition-all ${
                  showResult
                    ? pastSimpleAnswer.toLowerCase().trim() === verb.pastSimple.toLowerCase()
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-red-100 border-red-400 text-red-800'
                    : revealPastSimple
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-gray-500 focus:outline-none'
                }`}
                placeholder="Type here..."
                autoFocus={pastSimpleAnswer === '' && pastParticipleAnswer === ''}
              />
              
              {/* Sentence and reveal button row */}
              <div className="flex items-start gap-2 md:gap-3">
                {/* Sentence display - fixed height to prevent jumping */}
                <div className="flex-1 min-h-[35px] md:min-h-[40px]">
                  {loading ? (
                    <p className="text-xs md:text-sm text-gray-400 italic">Generating sentence...</p>
                  ) : sentences.pastSimpleBlank ? (
                    <p className="text-sm md:text-base text-gray-700">{sentences.pastSimpleBlank}</p>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-400 italic">Fill in the past simple form</p>
                  )}
                </div>
                
                {/* Reveal answer button */}
                {!showResult && !revealPastSimple && (
                  <button
                    onClick={handleRevealPastSimple}
                    className="text-xs text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
                  >
                    Reveal
                  </button>
                )}
              </div>
              
              {/* Correct answer display */}
              {showResult && pastSimpleAnswer.toLowerCase().trim() !== verb.pastSimple.toLowerCase() && (
                <p className="text-xs md:text-sm text-green-600">Correct: {verb.pastSimple}</p>
              )}
            </div>
          </div>

          {/* Past Participle Sentence */}
          <div className="group">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5 md:mb-2">Past Participle (V.D.)</p>
            <div className="space-y-2 md:space-y-3">
              {/* Input field - always displayed */}
              <input
                type="text"
                value={pastParticipleAnswer}
                onChange={(e) => setPastParticipleAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={showResult || revealPastParticiple}
                className={`w-full px-3 md:px-4 py-2 md:py-3 text-lg md:text-xl font-bold text-center rounded-lg border-2 transition-all ${
                  showResult
                    ? pastParticipleAnswer.toLowerCase().trim() === verb.pastParticiple.toLowerCase()
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-red-100 border-red-400 text-red-800'
                    : revealPastParticiple
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-gray-500 focus:outline-none'
                }`}
                placeholder="Type here..."
              />
              
              {/* Sentence and reveal button row */}
              <div className="flex items-start gap-2 md:gap-3">
                {/* Sentence display - fixed height to prevent jumping */}
                <div className="flex-1 min-h-[35px] md:min-h-[40px]">
                  {loading ? (
                    <p className="text-xs md:text-sm text-gray-400 italic">Generating sentence...</p>
                  ) : sentences.pastParticipleBlank ? (
                    <p className="text-sm md:text-base text-gray-700">{sentences.pastParticipleBlank}</p>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-400 italic">Fill in the past participle form</p>
                  )}
                </div>
                
                {/* Reveal answer button */}
                {!showResult && !revealPastParticiple && (
                  <button
                    onClick={handleRevealPastParticiple}
                    className="text-xs text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
                  >
                    Reveal
                  </button>
                )}
              </div>
              
              {/* Correct answer display */}
              {showResult && pastParticipleAnswer.toLowerCase().trim() !== verb.pastParticiple.toLowerCase() && (
                <p className="text-xs md:text-sm text-green-600">Correct: {verb.pastParticiple}</p>
              )}
            </div>
          </div>
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`mb-3 md:mb-5 p-3 md:p-4 rounded-lg text-center ${
            isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
          }`}>
            <p className={`text-base md:text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect 
                ? '✓ Correct!' 
                : (revealPastSimple || revealPastParticiple)
                  ? '✗ Answer was revealed - try again without revealing!'
                  : '✗ Incorrect. Try again next time!'
              }
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-3 md:mt-5 flex flex-col sm:flex-row justify-between gap-2 md:gap-3">
          {!showResult ? (
            <button
              onClick={checkAnswers}
              disabled={!pastSimpleAnswer.trim() || !pastParticipleAnswer.trim()}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white text-sm md:text-base font-semibold rounded-lg shadow hover:bg-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white text-sm md:text-base font-semibold rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Next Verb →
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 md:mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow border border-gray-200">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2 max-w-xs">
              <div 
                className="bg-gray-700 h-1.5 md:h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalVerbs) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 min-w-[45px] md:min-w-[50px]">{currentIndex + 1}/{totalVerbs}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticeCard


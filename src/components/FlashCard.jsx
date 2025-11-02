import { useExampleSentences, FLAGS_URL } from '../hooks/useExampleSentences'

function FlashCard({ verb, currentIndex, totalVerbs, onPrev, onNext }) {
  const { examples, loading, error, apiAvailable } = useExampleSentences(verb)

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
        
        {/* Quiz Area (Simple Past & Past Participle) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-center mb-4 md:mb-5">
          {/* Simple Past */}
          <div className="group">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5 md:mb-2">Simple Past (O.V.T.)</p>
            <div className="min-h-[60px] md:min-h-[70px] flex items-center justify-center rounded-lg p-3 md:p-4 bg-gray-100 border-2 border-gray-300">
              <span className="text-xl md:text-2xl font-bold text-gray-800">{verb.pastSimple}</span>
            </div>
            
            {/* Example Sentence */}
            <div className="mt-2 md:mt-3 h-[50px] md:h-[80px] flex flex-col justify-start">
              {loading && (
                <p className="text-xs text-gray-400 italic">Generating examples...</p>
              )}
              {!loading && examples.pastSimple && (
                <div className="text-xs md:text-sm text-gray-700 italic">
                  <p>{examples.pastSimple}</p>
                  {examples.pastSimpleTranslation && (
                    <p className="text-xs text-gray-500 mt-0.5 md:mt-1 not-italic">
                      {examples.pastSimpleTranslation}
                    </p>
                  )}
                </div>
              )}
              {!loading && error && apiAvailable === false && (
                <div className="group relative mt-2">
                  <p className="text-xs text-gray-400 italic cursor-help underline decoration-dotted inline-block">
                    Examples unavailable
                  </p>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 p-4 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <p className="mb-2 font-semibold text-sm">Prompt API not enabled</p>
                    <p className="mb-2">To enable example sentences:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mb-2">
                      <li>Open <code className="bg-gray-800 px-1.5 py-0.5 rounded">chrome://flags</code></li>
                      <li>Search for "Prompt API"</li>
                      <li>Enable the flag</li>
                      <li>Restart Chrome</li>
                    </ol>
                    <p className="mt-2 text-gray-300 text-xs">Or visit: <code className="bg-gray-800 px-1.5 py-0.5 rounded">{FLAGS_URL}</code></p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              )}
              {!loading && error && apiAvailable !== false && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </div>
          </div>

          {/* Past Participle */}
          <div className="group">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5 md:mb-2">Past Participle (V.D.)</p>
            <div className="min-h-[60px] md:min-h-[70px] flex items-center justify-center rounded-lg p-3 md:p-4 bg-gray-100 border-2 border-gray-300">
              <span className="text-xl md:text-2xl font-bold text-gray-800">{verb.pastParticiple}</span>
            </div>
            
            {/* Example Sentence */}
            <div className="mt-2 md:mt-3 h-[50px] md:h-[80px] flex flex-col justify-start">
              {loading && (
                <p className="text-xs text-gray-400 italic">Generating examples...</p>
              )}
              {!loading && examples.pastParticiple && (
                <div className="text-xs md:text-sm text-gray-700 italic">
                  <p>{examples.pastParticiple}</p>
                  {examples.pastParticipleTranslation && (
                    <p className="text-xs text-gray-500 mt-0.5 md:mt-1 not-italic">
                      {examples.pastParticipleTranslation}
                    </p>
                  )}
                </div>
              )}
              {!loading && error && apiAvailable === false && (
                <div className="group relative mt-2">
                  <p className="text-xs text-gray-400 italic cursor-help underline decoration-dotted inline-block">
                    Examples unavailable
                  </p>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 p-4 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <p className="mb-2 font-semibold text-sm">Prompt API not enabled</p>
                    <p className="mb-2">To enable example sentences:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mb-2">
                      <li>Open <code className="bg-gray-800 px-1.5 py-0.5 rounded">chrome://flags</code></li>
                      <li>Search for "Prompt API"</li>
                      <li>Enable the flag</li>
                      <li>Restart Chrome</li>
                    </ol>
                    <p className="mt-2 text-gray-300 text-xs">Or visit: <code className="bg-gray-800 px-1.5 py-0.5 rounded">{FLAGS_URL}</code></p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              )}
              {!loading && error && apiAvailable !== false && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="mt-3 md:mt-5 flex gap-2 md:gap-3">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white text-sm md:text-base font-semibold rounded-lg shadow hover:bg-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === totalVerbs - 1}
          className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white text-sm md:text-base font-semibold rounded-lg shadow hover:bg-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default FlashCard


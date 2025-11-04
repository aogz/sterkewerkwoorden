import { useState, useMemo, useEffect, useRef } from 'react'

function VerbList({ verbs, currentIndex, onVerbClick, getVerbStatus }) {
  const [searchQuery, setSearchQuery] = useState('')
  const listContainerRef = useRef(null)
  const currentItemRef = useRef(null)

  // Filter verbs based on search query
  const filteredVerbs = useMemo(() => {
    if (!searchQuery.trim()) {
      return verbs.map((verb, index) => ({ verb, originalIndex: index }))
    }
    
    const query = searchQuery.toLowerCase()
    return verbs
      .map((verb, index) => ({ verb, originalIndex: index }))
      .filter(({ verb }) => 
        verb.infinitive.toLowerCase().includes(query) ||
        verb.pastSimple.toLowerCase().includes(query) ||
        verb.pastParticiple.toLowerCase().includes(query) ||
        verb.english.toLowerCase().includes(query)
      )
  }, [verbs, searchQuery])

  // Scroll to current verb when it changes
  useEffect(() => {
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }, [currentIndex, filteredVerbs])

  return (
    <div className="w-80 h-full bg-white shadow-sm flex flex-col border-r border-gray-200">
      <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">All Verbs</h2>
        <p className="text-gray-600 text-xs md:text-sm mb-4">
          {filteredVerbs.length === verbs.length 
            ? `${verbs.length} verbs total`
            : `${filteredVerbs.length} of ${verbs.length} verbs`
          }
        </p>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search verbs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div ref={listContainerRef} className="flex-1 overflow-y-auto verb-list-container p-3 md:p-4">
        {filteredVerbs.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            No verbs found matching "{searchQuery}"
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredVerbs.map(({ verb, originalIndex }) => {
              const status = getVerbStatus ? getVerbStatus(originalIndex) : 'new'
              const statusColors = {
                new: 'bg-gray-50',
                learned: 'bg-gray-50 border-l-2 border-gray-400',
                mastered: 'bg-gray-50 border-l-2 border-gray-600'
              }
              const statusIcons = {
                new: '',
                learned: '📖',
                mastered: '✓'
              }
              
              const isCurrent = originalIndex === currentIndex
              
              return (
                <li
                  key={originalIndex}
                  ref={isCurrent ? currentItemRef : null}
                  onClick={() => onVerbClick(originalIndex)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isCurrent
                      ? 'bg-gray-800 text-white font-semibold'
                      : `${statusColors[status]} hover:bg-gray-100 text-gray-700`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{statusIcons[status]}</span>
                      <span className="text-sm font-semibold">{verb.infinitive}</span>
                    </div>
                    <span className={`text-xs ${originalIndex === currentIndex ? 'text-gray-300' : 'text-gray-500'}`}>
                      {originalIndex + 1}
                    </span>
                  </div>
                  <div className={`text-xs mt-1 ${originalIndex === currentIndex ? 'text-gray-300' : 'text-gray-500'}`}>
                    {verb.english}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default VerbList


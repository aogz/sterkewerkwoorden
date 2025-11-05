import { useState, useEffect, useCallback, useRef } from 'react'

const FLAGS_URL = 'chrome://flags/#prompt-api'

export function useExampleSentences(verb) {
  const [examples, setExamples] = useState({ 
    pastSimple: null, 
    pastSimpleTranslation: null,
    pastParticiple: null,
    pastParticipleTranslation: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiAvailable, setApiAvailable] = useState(null)
  const currentVerbRef = useRef(null)

  // Check API availability
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        if (typeof window.LanguageModel === 'undefined') {
          setApiAvailable(false)
          return
        }

        const availability = await LanguageModel.availability()
        setApiAvailable(availability === 'available')
      } catch (err) {
        setApiAvailable(false)
      }
    }

    checkAvailability()
  }, [])

  const generateExamples = useCallback(async (targetVerb) => {
    if (!apiAvailable || !targetVerb) {
      if (apiAvailable === false) {
        setError('Prompt API not available')
      }
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Check if user activation is required (usually needed for first use)
      const availability = await LanguageModel.availability()
      if (availability === 'unavailable') {
        setError('Prompt API is not available. Please enable it in chrome://flags')
        setApiAvailable(false)
        setLoading(false)
        return
      }
    if (availability === 'downloading' || availability === 'downloadable') {
        setError('Prompt API model is being loaded, it\'s expected to be available soon, please try again later')
        setApiAvailable(false)
        setLoading(false)
        return
    }

      const session = await LanguageModel.create()

      // Generate example for Simple Past (O.V.T.) with translation
      const pastSimplePrompt = `Write a simple Dutch sentence using "${targetVerb.pastSimple}" (past tense of "${targetVerb.infinitive}"). Then provide its English translation. Return ONLY the format: Dutch sentence | English translation. No explanations, no quotes, no additional text.`
      
      // Generate example for Past Participle (V.D.) with translation
      const pastParticiplePrompt = `Write a simple Dutch sentence using "${targetVerb.pastParticiple}" (past participle of "${targetVerb.infinitive}") with "hebben" or "zijn". Then provide its English translation. Return ONLY the format: Dutch sentence | English translation. No explanations, no quotes, no additional text.`

      const [pastSimpleResult, pastParticipleResult] = await Promise.all([
        session.prompt(pastSimplePrompt).catch(() => null),
        session.prompt(pastParticiplePrompt).catch(() => null)
      ])

      // Parse results - split by | to get sentence and translation
      const parseResult = (result) => {
        if (!result) return { sentence: null, translation: null }
        
        // Clean the result - remove quotes, explanations, and extra formatting
        let cleaned = result.trim()
        
        // Remove common prefixes like "Example:" or "Dutch:" or explanations
        cleaned = cleaned.replace(/^(Example|Dutch|Nederlands|Translation|English):\s*/i, '')
        cleaned = cleaned.replace(/^["']|["']$/g, '') // Remove surrounding quotes
        
        // Split by | and clean each part
        const parts = cleaned.split('|').map(p => {
          let part = p.trim()
          // Remove quotes from each part
          part = part.replace(/^["']|["']$/g, '')
          // Remove any trailing explanations or periods that might be part of explanation
          part = part.replace(/\.\s*(\(.*\)|\[.*\]|\{.*\})/g, '') // Remove explanations in brackets after period
          return part.trim()
        })
        
        return {
          sentence: parts[0] || null,
          translation: parts[1] || null
        }
      }

      const pastSimple = parseResult(pastSimpleResult)
      const pastParticiple = parseResult(pastParticipleResult)

      // Only update if we're still on the same verb
      if (currentVerbRef.current === targetVerb.infinitive) {
        setExamples({
          pastSimple: pastSimple.sentence,
          pastSimpleTranslation: pastSimple.translation,
          pastParticiple: pastParticiple.sentence,
          pastParticipleTranslation: pastParticiple.translation
        })
      }

      session.destroy()
    } catch (err) {
      console.error('Error generating examples:', err)
      // Only set error if we're still on the same verb
      if (currentVerbRef.current === targetVerb.infinitive) {
        setError('Failed to generate examples. Please ensure Prompt API is enabled in chrome://flags')
      }
    } finally {
      // Only update loading if we're still on the same verb
      if (currentVerbRef.current === targetVerb.infinitive) {
        setLoading(false)
      }
    }
  }, [apiAvailable])

  // Auto-generate when verb changes
  useEffect(() => {
    if (!verb) return

    currentVerbRef.current = verb.infinitive
    setExamples({ 
      pastSimple: null, 
      pastSimpleTranslation: null,
      pastParticiple: null,
      pastParticipleTranslation: null
    })
    setError(null)

    if (apiAvailable === true) {
      generateExamples(verb)
    } else if (apiAvailable === false) {
      setError('Prompt API not available')
    }
  }, [verb?.infinitive, apiAvailable, generateExamples])

  return {
    examples,
    loading,
    error,
    apiAvailable,
    generateExamples: () => generateExamples(verb)
  }
}

export { FLAGS_URL }


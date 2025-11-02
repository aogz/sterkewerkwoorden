import { useState, useEffect, useCallback, useRef } from 'react'

const FLAGS_URL = 'chrome://flags/#prompt-api'

export function usePracticeSentences(verb) {
  const [sentences, setSentences] = useState({ 
    pastSimple: null,
    pastSimpleBlank: null,
    pastParticiple: null,
    pastParticipleBlank: null
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
        setApiAvailable(availability !== 'unavailable')
      } catch (err) {
        setApiAvailable(false)
      }
    }

    checkAvailability()
  }, [])

  const generateSentences = useCallback(async (targetVerb) => {
    if (!apiAvailable || !targetVerb) {
      if (apiAvailable === false) {
        setError('Prompt API not available')
      }
      return
    }

    setLoading(true)
    setError(null)

    try {
      const availability = await LanguageModel.availability()
      if (availability === 'unavailable') {
        setError('Prompt API is not available. Please enable it in chrome://flags')
        setApiAvailable(false)
        setLoading(false)
        return
      }

      const session = await LanguageModel.create()

      // Generate sentence for Simple Past (O.V.T.)
      const pluralForm = targetVerb.pastSimplePlural || targetVerb.pastSimple + 'en'
      const pastSimplePrompt = `Write a simple, natural Dutch sentence using "${targetVerb.pastSimple}" (singular) or "${pluralForm}" (plural) - past tense of "${targetVerb.infinitive}". Use whichever form fits naturally in the sentence. Return ONLY the Dutch sentence. No explanations, no quotes, no additional text.`
      
      // Generate sentence for Past Participle (V.D.)
      const pastParticiplePrompt = `Write a simple, natural Dutch sentence using the EXACT form "${targetVerb.pastParticiple}" (past participle of "${targetVerb.infinitive}") with "hebben" or "zijn". You must use "${targetVerb.pastParticiple}" exactly as written. Return ONLY the Dutch sentence. No explanations, no quotes, no additional text.`

      const [pastSimpleResult, pastParticipleResult] = await Promise.all([
        session.prompt(pastSimplePrompt).catch(() => null),
        session.prompt(pastParticiplePrompt).catch(() => null)
      ])

      // Clean results
      const cleanSentence = (result) => {
        if (!result) return null
        let cleaned = result.trim()
        cleaned = cleaned.replace(/^(Example|Dutch|Nederlands):\s*/i, '')
        cleaned = cleaned.replace(/^["']|["']$/g, '')
        return cleaned.trim()
      }

      const pastSimpleSentence = cleanSentence(pastSimpleResult)
      const pastParticipleSentence = cleanSentence(pastParticipleResult)

      // Create sentences with blanks (replace the verb form with blank)
      const createBlank = (sentence, verbForm, pluralForm = null) => {
        if (!sentence || !verbForm) return null
        
        // Try singular form first
        const escapedForm = verbForm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        let regex = new RegExp(`\\b${escapedForm}\\b`, 'gi')
        if (regex.test(sentence)) {
          regex.lastIndex = 0
          return sentence.replace(regex, '...')
        }
        
        // Try plural form if provided
        if (pluralForm) {
          const escapedPlural = pluralForm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          regex = new RegExp(`\\b${escapedPlural}\\b`, 'gi')
          if (regex.test(sentence)) {
            regex.lastIndex = 0
            return sentence.replace(regex, '...')
          }
        }
        
        // If still not found, return the original sentence
        return sentence
      }

      const pastSimplePlural = targetVerb.pastSimplePlural || null
      const pastSimpleBlank = createBlank(pastSimpleSentence, targetVerb.pastSimple, pastSimplePlural)
      const pastParticipleBlank = createBlank(pastParticipleSentence, targetVerb.pastParticiple)

      // Only update if we're still on the same verb
      if (currentVerbRef.current === targetVerb.infinitive) {
        setSentences({
          pastSimple: pastSimpleSentence,
          pastSimpleBlank: pastSimpleBlank || pastSimpleSentence, // Fallback to original if blank creation fails
          pastParticiple: pastParticipleSentence,
          pastParticipleBlank: pastParticipleBlank || pastParticipleSentence
        })
      }

      session.destroy()
    } catch (err) {
      console.error('Error generating practice sentences:', err)
      if (currentVerbRef.current === targetVerb.infinitive) {
        setError('Failed to generate sentences. Please ensure Prompt API is enabled in chrome://flags')
      }
    } finally {
      if (currentVerbRef.current === targetVerb.infinitive) {
        setLoading(false)
      }
    }
  }, [apiAvailable])

  // Auto-generate when verb changes
  useEffect(() => {
    if (!verb) return

    currentVerbRef.current = verb.infinitive
    setSentences({ 
      pastSimple: null,
      pastSimpleBlank: null,
      pastParticiple: null,
      pastParticipleBlank: null
    })
    setError(null)

    if (apiAvailable === true) {
      generateSentences(verb)
    } else if (apiAvailable === false) {
      setError('Prompt API not available')
    }
  }, [verb?.infinitive, apiAvailable, generateSentences])

  return {
    sentences,
    loading,
    error,
    apiAvailable,
    generateSentences: () => generateSentences(verb)
  }
}

export { FLAGS_URL }


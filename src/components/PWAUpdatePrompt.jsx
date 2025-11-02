import { useEffect, useState } from 'react'

export function PWAUpdatePrompt() {
  const [showReload, setShowReload] = useState(false)
  const [prompt, setPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    // Listen for service worker update (vite-plugin-pwa)
    if ('serviceWorker' in navigator) {
      let refreshing = false
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        refreshing = true
        setShowReload(true)
      })

      // Check for updates
      const checkForUpdates = async () => {
        try {
          const registration = await navigator.serviceWorker.ready
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  setShowReload(true)
                }
              })
            }
          })
          
          // Check immediately
          await registration.update()
        } catch (error) {
          console.log('Service worker not available:', error)
        }
      }

      // Listen for beforeinstallprompt (PWA install prompt)
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault()
        setDeferredPrompt(e)
        setPrompt(true)
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      
      // Check for updates periodically
      checkForUpdates()
      const interval = setInterval(checkForUpdates, 60000) // Check every minute

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        clearInterval(interval)
      }
    }
  }, [])

  const handleReload = () => {
    window.location.reload()
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setPrompt(false)
    }
    
    setDeferredPrompt(null)
  }

  if (showReload) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
        <p className="text-sm font-semibold mb-2">New version available!</p>
        <button
          onClick={handleReload}
          className="w-full bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition-colors"
        >
          Reload to update
        </button>
      </div>
    )
  }

  if (prompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50">
        <p className="text-sm font-semibold mb-2">Install app for offline use</p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setPrompt(false)}
            className="px-4 py-2 rounded font-semibold hover:bg-gray-700 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    )
  }

  return null
}


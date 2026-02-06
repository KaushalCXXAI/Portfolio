import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import WorkOverlay from './components/WorkOverlay'
import './index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setContentReady(true)
  }

  const openOverlay = () => setShowOverlay(true)
  const closeOverlay = () => setShowOverlay(false)

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showOverlay) {
        closeOverlay()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showOverlay])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadingComplete} />}

      {/* Grid lines background */}
      <div className="grid-lines">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      <div className="container">
        <Header onWorkClick={openOverlay} />
        <Hero animate={contentReady} />
      </div>

      <WorkOverlay isOpen={showOverlay} onClose={closeOverlay} />
    </>
  )
}

export default App

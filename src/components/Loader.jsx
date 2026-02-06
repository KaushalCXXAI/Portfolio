import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Loader({ onComplete }) {
    const textRef = useRef(null)
    const overlayRef = useRef(null)
    const textToType = "Welcome to the portfolio of"

    useEffect(() => {
        let index = 0
        const speed = 50
        let isMounted = true
        const timeoutIds = []

        // Clear any existing text
        if (textRef.current) {
            textRef.current.textContent = ''
        }

        const type = () => {
            if (!isMounted || !textRef.current) return

            if (index < textToType.length) {
                textRef.current.textContent += textToType.charAt(index)
                index++
                const id = setTimeout(type, speed)
                timeoutIds.push(id)
            } else {
                // Wait then slide up
                const id = setTimeout(() => {
                    if (!isMounted || !overlayRef.current) return
                    gsap.to(overlayRef.current, {
                        y: '-100%',
                        duration: 0.8,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            if (isMounted) onComplete()
                        }
                    })
                }, 600)
                timeoutIds.push(id)
            }
        }

        // Start typing after short delay
        const startId = setTimeout(type, 400)
        timeoutIds.push(startId)

        return () => {
            isMounted = false
            timeoutIds.forEach(id => clearTimeout(id))
        }
    }, [onComplete])

    return (
        <div className="loader-overlay" ref={overlayRef}>
            <div className="loader-text">
                <span ref={textRef}></span>
            </div>
        </div>
    )
}

export default Loader

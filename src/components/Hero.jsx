import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Hero({ animate }) {
    const bioRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const hasAnimated = useRef(false)
    const allLetters = useRef([])

    useEffect(() => {
        if (!animate || hasAnimated.current) return
        hasAnimated.current = true

        // Set bio to hidden initially
        gsap.set(bioRef.current, { y: 40, opacity: 0 })

        // Collect all letters from both names
        allLetters.current = []

        // Split text into letters and set initial state
        const createLetters = (element) => {
            const text = element.dataset.text
            element.innerHTML = ''

            const letters = text.split('').map((char) => {
                const span = document.createElement('span')
                span.className = 'letter'
                span.textContent = char

                const randomRotation = (Math.random() - 0.5) * 50
                gsap.set(span, {
                    y: 80,
                    opacity: 0,
                    rotation: randomRotation,
                    transformOrigin: 'center bottom'
                })

                element.appendChild(span)
                return span
            })

            return letters
        }

        // Create letters for both names
        const firstNameLetters = createLetters(firstNameRef.current)
        const lastNameLetters = createLetters(lastNameRef.current)
        allLetters.current = [...firstNameLetters, ...lastNameLetters]

        // Create GSAP timeline for proper sequencing
        const tl = gsap.timeline()

        // Step 1: Animate first name letters in
        tl.to(firstNameLetters, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.04
        })

        // Step 2: Animate last name letters in (overlapping slightly)
        tl.to(lastNameLetters, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.04
        }, '-=0.3')

        // Step 3: Animate bio in after names
        tl.to(bioRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.2')

        // Step 4: Animate rotation correction for all letters
        tl.to(allLetters.current, {
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.015
        }, '-=0.4')

    }, [animate])

    return (
        <main className="main-content">
            <div className="badge">Under Construction</div>

            <div className="name-wrapper">
                <h1 className="name-first" ref={firstNameRef} data-text="Kaushal"></h1>
                <h1 className="name-last" ref={lastNameRef} data-text="Rangani"></h1>
            </div>

            <p className="bio" ref={bioRef} style={{ opacity: 0 }}>
                A computer engineer<span>ing student aspiring to work on flight software and space systems</span>
            </p>
        </main>
    )
}

export default Hero

import React, {useRef, useEffect} from 'react'
import './Hero.css'
import {gsap}  from 'gsap'

const Hero = () => {

  const heroRef = useRef(null)

  useEffect(() => {
    // gsap.from(heroRef.current, { duration: 1, y: 50,opacity:0, ease: 'none'})
    // gsap.from(ojiRef.current, { duration: 1, x: 100,opacity:0, ease: 'none'})
  //
  }, [])


  return (
    <div className='HeroContainer'>
        <div ref={heroRef} className='herodiv'>
            <p >
                THE FUTURE OF <span> WEB3</span>
            </p>
        </div>

        <p className='oji'>OJI</p>
        <p className='tag'>Tired of being controlled?  Let's decentralize the web!</p>
    </div>
  )
}

export default Hero
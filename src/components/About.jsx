import React, {useRef, useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)

  useEffect(() => {
    
    // gsap.from(aboutRef.current, { 
    //   duration: 1, 
    //   y: 50, 
    //   opacity:0, 
    //   ease: 'none',
    //   ScrollTrigger: {
    //     trigger: aboutRef.current,
    //     start: 'top center',
    //     end: 'bottom center',
    //   }})
    // gsap.from(ojiRef.current, { duration: 1, x: 100,opacity:0, ease: 'none'})
  }, [])
  return (
    <div   className='AboutContainer'>
      <div ref={aboutRef}>
        <p className='abouttitle'>ABOUT US</p>
        <p className='aboutp'>Ojii Labs is a next <span className='cyan'> generation </span> web3 Company. We handle fast and reliable <span className='cyan'> blockchain</span> transactions.</p>
      </div>
    </div>
  )
}

export default About
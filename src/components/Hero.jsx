import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth > 768 ?
     heroVideo : smallHeroVideo);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setVideoSrc(heroVideo)
    } else {
      setVideoSrc(smallHeroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      y: 0,
      duration: 2
    })
  }, [])

  useGSAP(() => {
    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      duration: 2
    })
  }, [])

  return (
   <section className="w-full nav-height bg-black relative">
    <div className="h-5/6 w-full flex-center flex-col">
        <p id='hero' className="hero-title">iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12 '>
          <video className='pointer-events-none' src={videoSrc} type='video/mp4' autoPlay muted playsInline={true} key={videoSrc}>
  
          </video>
        </div>
    </div>

    <div id='cta' className='flex flex-col opacity-0 translate-y-20 items-center w-full'>
      <a href="#highlights" className='btn'>Buy</a>
      <p className='text-xl font-normal'>From $199/month or $2,499 before trade-in</p>
    </div>
   </section>
  )
}

export default Hero

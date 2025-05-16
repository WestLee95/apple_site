import { useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        isStart: false,
        videoId: 0,
        isPlaying: false,
        isLastVideo: false,
    })

  return (
    <>
        <div className='flex items-center'>
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id='slider'  className='sm:pr-20 pr-10'>
                    <div  className='video-carousel_container'>

                        <div className='flex-center rounded-3xl w-full h-full
                        overflow-hidden bg-black'>
                            <video  id='video' preload='auto' className='pointer-events-none' src={list.video} type='video/mp4' muted playsInline={true}>
                            </video>
                        </div>

                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text) => (
                                <p key={text} className='md:text-2xl text-xl font-medium'>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
      </div>
    </>    
  )
}

export default VideoCarousel

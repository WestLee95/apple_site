import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

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

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, startPlay, videoId, isPlaying, isLastVideo } = video;

    useGSAP(() => {
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    isStart: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if(loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].play();
            } else {
                startPlay && videoRef.current[videoId].pause();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

    useEffect(() => {
        const currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]) {
            //animates the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    
                },

                onComplete: () => {

                }
            })
        }
    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((pre) => ({ ...pre, isEnd: true, 
                    videoId: i + 1 }));
                break;
            
            case 'video-last':
                setVideo((pre) => ({ ...pre, isLastVideo: 
                    true }));
                break;

            case 'video-reset':
                setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: 
                    false }));
                break;

            case 'play':
                setVideo((pre) => ({ ...pre, isPlaying: !pre.
                    isPlaying }));
                break;
        
            default:
                return video;
        }
    }


  return (
    <>
        <div className='flex items-center'>
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id='slider'  className='sm:pr-20 pr-10'>
                    <div  className='video-carousel_container'>

                        <div className='flex-center rounded-3xl w-full h-full
                        overflow-hidden bg-black'>
                            <video  
                            id='video' 
                            preload='auto' className='pointer-events-none' 
                            src={list.video} type='video/mp4' 
                            muted 
                            ref={(el) => (videoRef.current[i] = el)}
                            playsInline={true}
                            onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo,
                                    isPlaying: true,
                                }))
                            }}
                            onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                            onEnded={() => handleProcess('video-end', i)}
                            >
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
 
        <div className='relative flex-center mt-10'>
            <div className='bg-gray-300 flex-center py-5 px-7 backdrop-blur rounded-full'>
               {videoRef.current.map((_, i) => (
                   <span 
                   key={i} 
                   ref={(el) => (videoDivRef.current[i] = el)}
                   className='mx-2 h-3 w-3 bg-gray-200 relative rounded-full cursor-pointer'>
                        <span className='absolute h-full w-full rounded-full' 
                        ref={(el) => (videoDivRef.current[i] = el)}/>
                   </span>
               ))}     
            </div>

            <button className='control-btn'>
               <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
               alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
               onClick={() => handleProcess(isLastVideo ? 'video-reset' : !isPlaying ? 'play' : 'pause')} />
            </button>
        </div>
    </>    
  )
}

export default VideoCarousel

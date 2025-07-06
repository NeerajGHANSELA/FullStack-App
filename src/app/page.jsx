'use client';

import React from 'react'; // Importing React for building the component
import Image from 'next/image'; // Importing Image from next/image for optimized image loading
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Importing Footer component
import AnimatedVideoDemo from '../components/AnimatedVideoDemo';
import RegisterButton from '../components/RegisterButton'; // Importing RegisterButton component
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import './page.css';

export default function Home() {

  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  
  return (
    <div className='flex flex-col items-center justify-center gap-8 mt-30 mb-15 lg:mb-5'>

      <Navbar />

      <div 
        className="w-full mx-auto px-2 sm:px-4 md:px-6">
        <div
          className=" grid grid-cols-1 sm:grid-cols-[1fr_2fr] md:grid-cols-[2fr_3fr] gap-5 sm:gap-6 md:gap-8 items-center"
        >
          {/* Left column */}
          <div className="flex flex-col justify-center text-center sm:text-left"> 
            <motion.h1
              initial={{ opacity: 0, scale: 0.5, x:-100 }} 
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-700 mb-4 sm:mb-6'
            >
              Unlock your Confidence. Secure your Dream Job.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, scale: 0.5, x:-100 }} 
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='text-base sm:text-lg text-gray-500  leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto sm:mx-0'
            >
              <span className='text-black'>Sharpen</span> {' '}
              your {' '}
              <span className='text-black'>interview skills</span> {' '}
              through {' '}
              <span className='text-black'>guided practice</span> {' '}
              sessions, {' '}
              <span className='text-black'>instant feedback</span>
              , and {' '}
              <span className='text-black'>progress tracking</span> {' '}
               - so you walk into every hiring round fully prepared.
            </motion.p>

            <div 
              className='flex justify-center sm:justify-start'
            >
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }} 
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className='px-6 py-3 sm:px-2 sm:py-2 md:px-6 md:py-3 bg-[#D44040] text-white font-semibold rounded-full shadow-lg hover:bg-[#B33434] transition-colors duration-300 cursor-pointer'
              >
                Try quick 10-min session
              </motion.button>
            </div>
          </div>

          {/* Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='flex justify-center items-center'>
            <Image 
              src={'/intro.gif'}
              alt='Interview preparation into gif'
              width={800}
              height={1200}
              className='w-full h-auto rounded-lg object-cover shadow-xl max-h-[300px] sm:max-h-[500px] md:max-h-[600px]'
            />
          </motion.div>
        </div>
      </div>

      
      <motion.div 
        className='flex flex-col gap-4 items-center justify-center mt-10 sm:mt-14'
      >
        <div 
          className='flex flex-col items-center justify-center
          max-w-[400px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto gap-4'
        >

          <motion.h2 
            initial={{ opacity: 0, scale: 0.2, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ amount: 0.5 }}
            className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-color3'>
            Your personal interview coach — 24/7.
          </motion.h2> 
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.2, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ amount: 0.5 }}
            className='text-base font-normal font-mono leading-8 md:leading-10 sm:text-lg md:text-xl text-gray-600 tracking-wider'
          >
            Continuously refine your delivery with targeted feedback - so you are {' '}
            <span className='lg:flex lg:justify-self-center'>always one step closer to your next win.</span>
            
          </motion.p>

        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className='mt-3'
      >
        <RegisterButton />
      </motion.div>

      <div className='flex flex-col items-center'>
        <div 
          className='grid grid-cols-1 w-full mx-auto mt-16 md:grid-cols-2 md:items-center sm:gap-4 xl:gap-30 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl'
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.2, x: -100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className='font-extrabold text-color2 sm:text-5xl md:text-7xl/normal xl:text-8xl/normal md:tracking-[0.020em]'
          >
            Take A <br className='hidden md:block' />
            Little <br className='hidden md:block' />
            Glimpse
          </motion.h2>

          <div>
            <AnimatedVideoDemo />
          </div>
        </div>
      </div>      

      <div className='flex flex-col items-center sm:gap-10 md:gap-14 lg:gap-20 mt-10'> 
        <motion.div 
          initial={{ opacity: 0, scale: 0.2, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className='w-screen pb-6 bg-radial-[at_50%_75%] from-[#e9ecef] via-[#adb5bdab] to[#212529d4] to-90%' /* Background color. */
        >
          <div 
            className='grid grid-cols-1 mt-6 mx-auto items-center md:grid-cols-2 sm:gap-4 sm:max-w-xl md:max-w-2xl md:gap-8 lg:max-w-5xl lg:gap-12 xl:max-w-7xl'
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.2, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: false }}
              className='font-bold leading-relaxed sm:text-2xl md:text-3xl/normal md:tracking-[0.020em] lg:text-4xl/snug'
            >
              Why Conventional Mock-Interview Tools Fall Short
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, scale: 0.2, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: false }}
              className='text-base/relaxed md:text-md lg:text-lg'
            >
              Most practice platforms stop at your words — text tools let you endlessly edit responses, and voice-only apps catch your tone but miss the real-world dynamics you will face in person.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.2, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className='grid grid-cols-1 items-center md:grid-cols-2 sm:gap-4 sm:max-w-xl md:max-w-2xl md:gap-8 lg:max-w-5xl lg:gap-12 xl:max-w-7xl'
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.2, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false }}
            className='font-bold leading-relaxed sm:text-2xl md:text-3xl/normal md:tracking-[0.020em] md:order-2 md:mb-8 lg:text-4xl/snug xl:mb-12'
          >
            The Power of Nonverbal Cues
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, scale: 0.2, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: false }}
            className='text-base/relaxed md:text-md lg:text-lg'
          >
            Split-second eye contact, the tiny “um” that betrays your nerves, the posture and gestures that broadcast confidence before you even begin. Such non-verbal cues are not just important — they can make or break your first impression. 
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.2, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className='w-screen pb-10 pt-4 mt-1 bg-radial-[at_50%_75%] from-[#e9ecef] via-[#adb5bdab] to[#212529d4] to-90%'
        >
          <div 
            className='grid grid-cols-1 mx-auto mt-6 items-center md:grid-cols-2 sm:gap-4 sm:max-w-xl md:max-w-2xl md:gap-8 lg:max-w-5xl lg:gap-12 xl:max-w-7xl'
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.2, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false }} 
              className='font-bold leading-relaxed sm:text-2xl md:text-3xl/normal md:tracking-[0.020em] lg:text-4xl/snug'
            >
              Why We Created InterviewPrep
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, scale: 0.2, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: false }}
              className='text-base/relaxed md:text-md lg:text-lg'
            >
              Immersing yourself in authentic interview scenarios long before the big day turns preparation into performance — InterviewPrep makes every practice matter. Vary your question paths to sharpen your responsiveness. Walk into every room with the confidence of someone who's already been here before.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div 
        className='flex flex-col items-center mt-5 md:mt-16 xl:mt-20 sm:gap-5 sm:max-w-xl md:max-w-2xl md:gap-8 lg:max-w-5xl lg:gap-12 xl:max-w-7xl'
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.9 }}
          className='font-bold leading-relaxed sm:text-3xl sm:tracking-wide md:text-4xl md:tracking-wider lg:text-5xl lg:tracking-widest text-color4'
        >
          What InterviewPrep provides
        </motion.h2>

        <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:grid-rows-2'>
          {/* First block. */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className='w-fit flex flex-col items-center justify-center gap-6 px-4 py-4 bg-[#dee2e6] rounded-4xl sm:shadow-lg/30 md:shadow-lg/40 xl:shadow-xl/40 shadow-[#b97375]'
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, delay: 0.1 }}
              className='font-bold text-color sm:text-lg md:text-xl lg:text-2xl'
            >
              Immersive Video & Audio Mock Interview
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, scale: 0.2, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: false, amount: 0.1 }}
              className='text-[#495057] md:text-md lg:text-lg'
            >
              Recreates a {' '}
              <span className='text-black font-medium'>real-time interview</span> {' '}
              setting so you can {' '}
              <span className='text-black font-medium'>sharpen your responses under authentic conditions</span>
              .
            </motion.p>
          </motion.div>
              
          {/* Second block. */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7,
              delay: (isMd 
                ? 0.4 // if medium screen
                : (isLg ? 0.4 : 0)  // if large screen, delay 0.4sec. Otherwise, small screen, no delay
              )
             }}
            viewport={{ once: false }}
            className='w-fit flex flex-col items-center justify-center gap-6 px-4 py-4 bg-[#dee2e6] rounded-4xl sm:shadow-lg/30 md:shadow-lg/40 xl:shadow-xl/40 shadow-[#b97375]'
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, 
                delay: (isMd 
                  ? 0.5 // if medium screen, delay 0.5sec
                  : (isLg ? 0.5 : 0.1)  // if large screen, delay 0.5sec. Otherwise, small screen, delay 0.1sec
                )
              }}
              className='font-bold text-color sm:text-lg md:text-xl lg:text-2xl'
            >
              AI-Powered Content & Delivery Analysis
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, scale: 0.2, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, 
                delay: (isMd
                  ? 0.6 // if medium screen, delay 0.6sec
                  : (isLg ? 0.6 : 0.2)  // if large screen, delay 0.6sec. Otherwise, small screen, delay 0.2sec
                )
              }}
              viewport={{ once: false, amount: 0.1 }}
              className='text-[#495057] md:text-md lg:text-lg'
            >
              <span className='text-black font-medium'>Provides feedback</span> {' '}
               to make your spoken answers clear, well-organized, and confidently delivered.
              
            </motion.p>
          </motion.div>

          {/* Third block. */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7,
              delay: (isLg
                ? 0.8   // if large screen, delay 0.8sec
                : (isMd ? 0 : 0)  // if medium screen, no delay. Otherwise, small screen, no delay
              )
             }}
            viewport={{ once: false }}
            className='w-fit flex flex-col items-center justify-center gap-6 px-4 py-4 bg-[#dee2e6] rounded-4xl sm:shadow-lg/30 md:shadow-lg/40 xl:shadow-xl/40 shadow-[#b97375]'
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, 
                delay: (isLg
                  ? 0.9 // if large screen, delay 0.9sec
                  : (isMd ? 0.1 : 0.1)  // if medium screen, delay 0.1sec. Otherwise, small screen, delay 0.1sec
                )                
              }}
              viewport={{ once: false }}
              className='font-bold text-color sm:text-lg md:text-xl lg:text-2xl'
            >
              Non-Verbal Cue Evaluation
            </motion.h3>
              <motion.p 
                initial={{ opacity: 0, scale: 0.2, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, 
                  delay: (isLg 
                    ? 1.0 // if large screen, delay 1.0sec
                    : (isMd ? 0.2 : 0.2)  // if medium screen, delay 0.2sec. Otherwise, small screen, delay 0.2sec
                  )
                }}
                viewport={{ once: false, amount: 0.1 }}
                className='text-[#495057] md:text-md lg:text-lg'
              >
                <span className='text-black font-medium'>Delivers actionable guidance</span> {'' }
                to polish your presence and elevate your delivery.
              </motion.p>
          </motion.div>

          {/* Fourth block. */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7,
              delay: (isLg
                ? 1.2 // if large screen, delay 1.2sec
                : (isMd ? 0.4 : 0)  // if large screen, delay 1.2sec. Otherwise, medium screen, delay 0.4sec. Otherwise, small screen, no delay
              )
            }}
            viewport={{ once: false }}
            className='w-fit flex flex-col items-center justify-center gap-6 px-4 py-4 bg-[#dee2e6] rounded-4xl sm:shadow-lg/30 md:shadow-lg/40 xl:shadow-xl/40 shadow-[#b97375]'
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, 
                delay: (isLg
                  ? 1.3 // if large screen, delay 1.3sec
                  : (isMd ? 0.5 : 0.1)  // if medium screen, delay 0.5sec. Otherwise, small screen, delay 0.1sec
                )
              }}
              viewport={{ once: false }}
              className='font-bold text-color sm:text-lg md:text-xl lg:text-2xl'
            >
              Personalized Progress Tracking & Insights
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, scale: 0.2, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, 
                delay: (isLg
                  ? 1.4 // if large screen, delay 1.4sec
                  : (isMd ? 0.6 : 0.2)  // if medium screen, delay 0.6sec. Otherwise, small screen, delay 0.2sec
                )
              }}
              viewport={{ once: false, amount: 0.1 }}
              className='text-[#495057] md:text-md lg:text-lg'
            >
              Offers {' '}
              <span className='text-black font-medium'>ongoing insights</span> {' '}
              into your performance, {' '}
              <span className='text-black font-medium'>highlights areas to revisit</span>
              , and suggests {' '}
              <span className='text-black font-medium'>tailored next steps</span> {' '}
               to keep you moving forward.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-dom-confetti';
import useSound from 'use-sound';

const MythBusters = () => {
  const [activeMyth, setActiveMyth] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [playDrumroll] = useSound(
    '/src/assets/snare-roll-84943.mp3',
    { volume: 0.09 }
  );
  const [playCymbal] = useSound(
    '/src/assets/success-fanfare-trumpets-6185.mp3',
    { volume: 0.09 }
  );

  const myths = [
    {
      myth: '"Donating blood hurts a lot."',
      fact: 'Most donors compare it to a quick pinch! The needle discomfort lasts only a second.',
      emoji: '💉'
    },
    {
      myth: '"You can\'t donate if you have diabetes."',
      fact: 'People with well-controlled diabetes can usually donate blood!',
      emoji: '🩺'
    },
    {
      myth: '"Donating blood makes you weak."',
      fact: 'Your body replaces the fluid within 24 hours and red blood cells in 4-6 weeks!',
      emoji: '💪'
    },
    {
      myth: '"You can get diseases from donating blood."',
      fact: 'All equipment is sterile and single-use. Zero infection risk!',
      emoji: '✅'
    },
    {
      myth: '"Vegetarians can\'t donate blood."',
      fact: 'As long as you meet hemoglobin levels, your diet doesn\'t matter!',
      emoji: '🥦'
    },
    {
      myth: '"Older adults can\'t donate blood."',
      fact: 'No upper age limit if you\'re healthy! Many donate well into their 70s.',
      emoji: '👵'
    },
  ];

  const triggerVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleOpenModal = (index) => {
    playDrumroll();
    triggerVibration();
    setActiveMyth(index);
    setTimeout(() => {
      setConfetti(true);
      playCymbal();
      triggerVibration();
    }, 1500);
  };

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 dark:text-white drop-shadow-lg mb-3"
          >
            Myth <span className="text-Red">Busters</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:text-xl text-lg text-Red dark:text-Red/80 max-w-2xl mx-auto"
          >
            Click a myth to reveal the shocking truth!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {myths.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenModal(index)}
              className="bg-white dark:bg-red-100 p-6 rounded-xl shadow-lg cursor-pointer border-2 border-transparent hover:border-red-200 transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.myth}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-600">
                  Dare to click?
                </span>
                <span className="text-2xl">{item.emoji}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeMyth !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => {
                setActiveMyth(null);
                setConfetti(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { type: 'spring', damping: 25 }
                }}
                exit={{ scale: 0.7, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Confetti
                    active={confetti}
                    config={{
                      angle: 90,
                      spread: 180,
                      startVelocity: 40,
                      elementCount: 100,
                      dragFriction: 0.12,
                      duration: 3000,
                      stagger: 3,
                      width: '10px',
                      height: '10px',
                      colors: ['#ef4444', '#10b981', '#3b82f6', '#f59e0b']
                    }}
                  />
                </div>

                <div className="bg-red-600 p-4 text-white">
                  <h3 className="text-2xl font-bold text-center">
                    THE TRUTH REVEALED!
                  </h3>
                </div>
                
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      transition: { delay: 0.3 }
                    }}
                    className="text-6xl mb-6"
                  >
                    {myths[activeMyth].emoji}
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { delay: 0.5 }
                    }}
                    className="text-2xl font-bold text-gray-800 mb-4"
                  >
                    {myths[activeMyth].myth}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.7 }
                    }}
                    className="bg-green-50 p-4 rounded-lg border border-green-200"
                  >
                    <p className="text-lg text-gray-800">
                      <span className="font-bold text-green-600">FACT:</span> {myths[activeMyth].fact}
                    </p>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveMyth(null);
                    setConfetti(false);
                  }}
                  className="w-full py-3 bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
                >
                  CLOSE REVELATION
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MythBusters;
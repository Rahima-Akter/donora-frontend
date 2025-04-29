import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LiveDonationTracker = () => {
  const [donations, setDonations] = useState(0);
  const [activeCities, setActiveCities] = useState([]);
  const [bloodData, setBloodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // positions for cities
  const cityPositions = [
    { top: '25%', left: '33%' },  // Dhaka
    { top: '40%', left: '65%' },  // Chittagong
    { top: '15%', left: '20%' },  // Rajshahi
    { top: '20%', left: '55%' },  // Khulna
    { top: '15%', left: '80%' },  // Sylhet
    { top: '60%', left: '45%' },  // Barishal
    { top: '55%', left: '10%' },  // Rangpur
    { top: '65%', left: '87%' }   // Cox's Bazar
  ];

  useEffect(() => {
    fetch('/bloodTracker.json')
      .then(res => res.json())
      .then(data => {
        setBloodData(data);
        // Initialize with first 3 cities as active
        setActiveCities(data.slice(0, 3));
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (bloodData.length === 0) return;

    const interval = setInterval(() => {
      setDonations(prev => prev + Math.floor(Math.random() * 3) + 1);
      
      // Rotate active cities
      setActiveCities(prev => {
        const currentIndices = prev.map(city => 
          bloodData.findIndex(item => item.id === city.id)
        );
        const nextIndices = currentIndices.map(idx => 
          (idx + 1) % bloodData.length
        );
        return nextIndices.map(idx => bloodData[idx]);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bloodData]);

  // Get emoji based on city name
  const getCityEmoji = (cityName) => {
    const emojiMap = {
      'Dhaka': '🏙️',
      'Chittagong': '⛴️',
      'Rajshahi': '🎓',
      'Khulna': '🌊',
      'Sylhet': '⛰️',
      'Barishal': '🚤',
      'Rangpur': '🌾',
      "Cox's Bazar": '🏖️'
    };
    return emojiMap[cityName] || '🏥';
  };

  // Check if city has critical blood supply
  const hasCriticalStock = (city) => {
    return Object.values(city.blood_stock).some(type => type.status === "critical");
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p>Loading blood donation data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 drop-shadow-lg dark:text-white mb-1">
          <span className="text-Red">Live</span> Donations Across Bangladesh
        </h2>
        <p className="text-xltext-Red/80 mb-8 max-w-2xl mx-auto">
          {donations}+ donations today! Join the movement.
        </p>

        <div className="relative h-96 dark:bg-black bg-gray-50 rounded-xl overflow-hidden dark:border-none border border-gray-200">
          {/* Animated map dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0],
                x: Math.random() * 1000 - 100,
                y: Math.random() * 400 - 50
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-2 h-2 bg-red-400 rounded-full"
            />
          ))}

          {/* City markers - Now using predefined positions */}
          {bloodData.map((city, index) => (
            <motion.div
              key={city.id}
              style={{
                position: 'absolute',
                top: cityPositions[index]?.top || '50%',
                left: cityPositions[index]?.left || '50%'
              }}
              animate={{
                scale: activeCities.some(c => c.id === city.id) ? [1, 1.2, 1] : 1,
                opacity: activeCities.some(c => c.id === city.id) ? 1 : 0.7,
                y: activeCities.some(c => c.id === city.id) ? [0, -5, 0] : 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className={`p-2 rounded-full shadow-lg ${
                hasCriticalStock(city) 
                  ? 'bg-red-100 border-2 border-red-500' 
                  : 'bg-green-100 border-2 border-green-500'
              }`}>
                <span className="text-2xl">{getCityEmoji(city.city)}</span>
              </div>
              <motion.p 
                className="mt-1 font-medium text-sm whitespace-nowrap"
                animate={{
                  color: hasCriticalStock(city) ? '#ef4444' : '#065f46'
                }}
              >
                {city.city}
              </motion.p>
              {activeCities.some(c => c.id === city.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-xs ${
                    hasCriticalStock(city)
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  } px-2 py-1 rounded-full mt-1 mx-auto`}
                >
                  {hasCriticalStock(city) ? 'URGENT!' : 'Active'}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Panel */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {bloodData.slice(0, 4).map(city => (
            <motion.div 
              key={`stats-${city.id}`}
              whileHover={{ y: -5 }}
              className={`p-4 rounded-lg ${
                activeCities.some(c => c.id === city.id)
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-gray-50'
              }`}
            >
              <h3 className="font-bold">{city.city}</h3>
              <p className="text-sm text-gray-600">
                {Object.values(city.blood_stock)
                  .filter(t => t.status === "critical").length} urgent types
              </p>
              <p className="text-xs mt-1">
                {city.donations_today} donations today
              </p>
            </motion.div>
          ))}
        </div>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg"
        >
          Become a Donor Today
        </motion.button> */}
      </div>
    </section>
  );
};

export default LiveDonationTracker;
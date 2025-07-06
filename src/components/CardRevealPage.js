"use client"


import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const cardsData = [
  {
    id: 1,
    title: "Intelligent Matching",
    description: "Connects skills to perfect roles.",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Scam Protection",
    description: "AI detects and blocks fraudulent listings.",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "Automated Applications",
    description: "Streamlines your job application process.",
    color: "from-pink-500 to-red-600",
  },
]

const CardRevealPage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero section */}
      <div className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-indigo-400">Discover Our Features</h1>
          <p className="text-xl text-gray-300 mb-8">Scroll down to explore what makes us different</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-indigo-400 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
      </div>

      {/* Horizontal stacked cards section */}
      <div className="relative">
        <HorizontalStackedCards scrollY={scrollY} />
      </div>

      {/* Individual card sections for mobile/alternative view */}
      <div className="block md:hidden">
        {cardsData.map((card, index) => (
          <MobileCardContainer key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Final section */}
      <div className="h-screen flex items-center justify-center relative">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.8 }}
          variants={finalSectionVariants}
          className="text-center z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of professionals who trust our platform</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get Started Now
          </motion.button>
        </motion.div>

        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function HorizontalStackedCards({ scrollY }) {
  return (
    <div className="hidden md:block relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Progress indicator */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex space-x-2">
              {cardsData.map((_, index) => {
                const progress = Math.max(
                  0,
                  Math.min(1, (scrollY - window.innerHeight * (index + 1)) / window.innerHeight),
                )
                return (
                  <div key={index} className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 transition-all duration-300 ease-out"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stacked cards */}
          <div className="relative flex justify-center items-center">
            {cardsData.map((card, index) => {
              const cardStart = window.innerHeight * (index + 1)
              const cardEnd = window.innerHeight * (index + 2)
              const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / (cardEnd - cardStart)))

              // Calculate transforms based on scroll progress
              const translateX = index === 0 ? 0 : -100 + progress * 100
              const translateY = progress * -20
              const scale = 0.9 + progress * 0.1
              const opacity = index === 0 ? 1 : progress
              const zIndex = cardsData.length - index + Math.floor(progress * 10)

              return (
                <motion.div
                  key={card.id}
                  className="absolute"
                  style={{
                    transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                >
                  <StackedCard card={card} index={index} progress={progress} />
                </motion.div>
              )
            })}
          </div>

          {/* Side navigation */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
            {cardsData.map((card, index) => {
              const isActive = scrollY >= window.innerHeight * (index + 1) && scrollY < window.innerHeight * (index + 2)
              return (
                <div
                  key={card.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? "bg-indigo-400 scale-125" : "bg-gray-600"
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function StackedCard({ card, index, progress }) {
  return (
    <motion.div
      className="relative perspective-1000"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Card glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl blur-xl opacity-50`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          delay: index * 0.5,
        }}
      />

      {/* Main card */}
      <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700 w-80 lg:w-96 h-[500px] flex flex-col justify-between">
        {/* Card header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center text-white font-bold text-xl`}
            >
              {card.id}
            </div>
            <div className="text-gray-400 text-sm">
              {String(index + 1).padStart(2, "0")} / {String(cardsData.length).padStart(2, "0")}
            </div>
          </div>

          <motion.h3
            className="text-3xl lg:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            {card.title}
          </motion.h3>

          <motion.p
            className="text-lg text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: progress > 0.5 ? 1 : 0, y: progress > 0.5 ? 0 : 20 }}
            transition={{ delay: 0.4 }}
          >
            {card.description}
          </motion.p>
        </div>

        {/* Card footer */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: progress > 0.7 ? 1 : 0, y: progress > 0.7 ? 0 : 20 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: progress > 0.8 ? "100%" : "0%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
            <span className="text-gray-400 text-sm">{Math.round(progress * 100)}%</span>
          </div>

          <motion.button
            className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${card.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
          <div className={`w-full h-full rounded-full bg-gradient-to-r ${card.color}`} />
        </div>
      </div>
    </motion.div>
  )
}

function MobileCardContainer({ card, index }) {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3 }}
        variants={mobileCardVariants}
        custom={index}
        className="relative"
      >
        <StackedCard card={card} index={index} progress={1} />
      </motion.div>
    </div>
  )
}

// Animation variants
const mobileCardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  onscreen: (index) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
}

const finalSectionVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
}

export default CardRevealPage

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ClassesView from './components/ClassesView';
import GalleryView from './components/GalleryView';
import MembershipView from './components/MembershipView';
import AboutView from './components/AboutView';
import { ActiveView } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('classes');
  
  // Dark mode state initialized with local storage and system prefers-color-scheme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clay_co_theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark mode class with state
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('clay_co_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('clay_co_theme', 'light');
    }
  }, [isDarkMode]);
  
  // Tracks class selection clicks to auto-scroll and select inside ClassesView
  const [classBookTrigger, setClassBookTrigger] = useState<{ selectedClass: string; timestamp: number } | null>(null);

  // Handles "Book Now" clicking inside Header or from anywhere
  const handleBookNowTrigger = () => {
    setActiveView('classes');
    // Set trigger with current timestamp to ensure useEffect fires even if the class stays the same
    setClassBookTrigger({
      selectedClass: 'Beginner Foundations',
      timestamp: Date.now()
    });
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-background text-on-background">
      {/* Top Header Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onBookNowClick={handleBookNowTrigger}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Canvas with smooth transition fade */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeView === 'classes' && (
              <ClassesView onClassBookTrigger={classBookTrigger} />
            )}
            
            {activeView === 'gallery' && (
              <GalleryView />
            )}

            {activeView === 'membership' && (
              <MembershipView />
            )}
            
            {activeView === 'about' && (
              <AboutView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Footer block */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}

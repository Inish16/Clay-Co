import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onBookNowClick: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export default function Header({
  activeView,
  setActiveView,
  onBookNowClick,
  isDarkMode,
  setIsDarkMode
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ActiveView }[] = [
    { label: 'Classes', value: 'classes' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Membership', value: 'membership' },
    { label: 'About', value: 'about' }
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-surface-bright/80 backdrop-blur-md sticky top-0 w-full z-40 border-b border-outline-variant/10 transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-16 py-6 md:py-8">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('classes')}
          className="font-serif text-3xl md:text-4xl text-primary font-medium hover:opacity-90 transition-opacity tracking-tight cursor-pointer"
        >
          Clay &amp; Co.
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 items-center">
          {navItems.map((item) => {
            const isActive = activeView === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`font-sans text-sm tracking-wider font-semibold uppercase relative py-1 transition-colors hover:text-primary cursor-pointer ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Book Now Button and Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary cursor-pointer flex items-center justify-center border border-outline-variant/10 bg-surface-container-lowest"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onBookNowClick}
            className="inline-flex items-center justify-center bg-primary text-on-primary font-sans text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded hover:bg-primary-tint transition-all shadow-md hover:shadow-lg active:translate-y-[1px] cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-surface-container transition-colors text-primary cursor-pointer flex items-center justify-center border border-outline-variant/10 bg-surface-container-lowest"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary p-1.5 focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-surface-container-low border-b border-outline-variant/20 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navItems.map((item) => {
                const isActive = activeView === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`font-sans text-left text-base font-semibold tracking-wide py-2 transition-colors border-b border-outline-variant/10 ${
                      isActive ? 'text-primary pl-2 border-l-2 border-l-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNowClick();
                }}
                className="w-full mt-2 bg-primary text-on-primary font-sans text-sm font-semibold tracking-wider uppercase py-4 rounded hover:bg-primary-tint transition-colors flex items-center justify-center gap-2"
              >
                Book Now
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleAboutNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Save simulation to localStorage
      const subscribers = JSON.parse(localStorage.getItem('clay_co_subscribers') || '[]');
      subscribers.push({ email, subscribedAt: new Date().toLocaleDateString() });
      localStorage.setItem('clay_co_subscribers', JSON.stringify(subscribers));
    }, 1000);
  };

  return (
    <footer className="w-full mt-auto bg-surface-container-low dark:bg-surface-container-low relative z-20 border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        {/* Brand / Copyright */}
        <div className="flex flex-col justify-between space-y-6 lg:space-y-0">
          <div>
            <span className="font-serif text-2xl text-primary font-semibold block mb-2">
              Clay &amp; Co.
            </span>
            <p className="font-sans text-sm text-tertiary max-w-xs leading-relaxed">
              Crafting serenity and beautiful organic forms directly from raw desert soil.
            </p>
          </div>
          <p className="font-sans text-xs text-tertiary">
            &copy; 2024 Clay &amp; Co. Pottery Studio. Handcrafted in the desert.
          </p>
        </div>

        {/* Studio Info Column */}
        <div className="flex flex-col space-y-3 justify-start pt-1">
          <span className="font-sans text-sm font-semibold tracking-wide uppercase text-on-surface-variant">
            The Studio
          </span>
          <a
            href="#about-section"
            onClick={handleAboutNavigation}
            className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
          >
            Location: 123 Artisan Way
          </a>
          <a
            href="#about-section"
            onClick={handleAboutNavigation}
            className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
          >
            Hours: Tue-Sun 10am-6pm
          </a>
          <a
            href="#memberships"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('membership');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
          >
            Studio Memberships
          </a>
        </div>

        {/* Social / Connect Column */}
        <div className="flex flex-col space-y-3 justify-start pt-1">
          <span className="font-sans text-sm font-semibold tracking-wide uppercase text-on-surface-variant mb-1">
            Connect With Us
          </span>
          <div className="flex flex-col space-y-2">
            <a
              href="https://instagram.com"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
            >
              Pinterest
            </a>
          </div>
        </div>

        {/* Newsletter Signup Column */}
        <div className="flex flex-col space-y-3 justify-start pt-1">
          <span className="font-sans text-sm font-semibold tracking-wide uppercase text-on-surface-variant mb-1 flex items-center gap-1.5">
            <Mail size={15} className="text-primary" />
            Stay Connected
          </span>
          <p className="font-sans text-xs text-tertiary leading-relaxed mb-1">
            Subscribe to receive kiln firing dates, guest potter workshops, and seasonal student showcase updates.
          </p>
          
          {isSubscribed ? (
            <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-lg flex items-center gap-2 text-xs text-secondary-container font-medium">
              <Check size={16} className="text-secondary shrink-0" />
              <span>You're subscribed! Keep an eye on your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-colors py-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="bg-transparent text-sm text-on-background outline-none flex-grow placeholder:text-tertiary/60 pr-2 font-sans"
                  aria-label="Email Address for newsletter"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-primary hover:text-primary-tint disabled:opacity-50 transition-colors p-1 cursor-pointer"
                  aria-label="Submit subscription"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-[10px] text-red-500 font-medium mt-1">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}

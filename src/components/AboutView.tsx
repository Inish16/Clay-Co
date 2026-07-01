import React, { useState } from 'react';
import { MapPin, Clock, Calendar, HelpCircle, ChevronDown, Award, Globe, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-outline-variant/15 py-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-2 font-serif text-lg text-on-background hover:text-primary transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-secondary shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed pt-2 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutView() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What should I wear to my first clay class?",
      answer: "We recommend wearing comfortable, casual clothes and shoes that you don't mind getting dusty or muddy. Clay washes out of most fabrics completely, but we will also provide a protective full-length linen apron for you to use during your session."
    },
    {
      question: "Do I need any prior pottery experience?",
      answer: "None at all! Our Beginner Foundations session is explicitly designed for absolute beginners who have never touched a pottery wheel before. Our friendly instructors will guide you step-by-step through centering, opening, and pulling."
    },
    {
      question: "How long does the firing and glazing process take?",
      answer: "Once your piece is thrown, it must slow-dry to bone dry state (about 1-2 weeks), then undergo a bisque firing (12 hours), get hand-glazed, and undergo a final high-temperature glaze firing (another 12 hours). Usually, your finished pieces will be ready for pickup about 3 to 4 weeks after your class."
    },
    {
      question: "Can I cancel or reschedule my booked session?",
      answer: "Yes, you can reschedule or receive full credit up to 48 hours before your scheduled session. Because class sizes are extremely small (maximum 6 students per session), we cannot offer refunds for cancellations made under 48 hours."
    }
  ];

  const coreValues = [
    {
      icon: <Award className="text-primary" size={24} />,
      title: "Mindful Pace",
      desc: "We focus on slow-living. Pottery is a beautiful way to unplug, steady your mind, and create something quiet with your hands."
    },
    {
      icon: <Globe className="text-primary" size={24} />,
      title: "Natural Materials",
      desc: "Our stoneware and terracotta clays are locally sourced, and our glazes are lead-free, mineral-rich, and hand-blended in the desert."
    },
    {
      icon: <Heart className="text-primary" size={24} />,
      title: "Welcoming Space",
      desc: "We believe in supportive, judgment-free learning. Every wabi-sabi crack, wobble, and bump is part of your unique creative story."
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-24 relative z-10">
      {/* Intro section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">Our Story</span>
          <h1 className="font-serif text-4xl md:text-5xl text-on-background tracking-tight">
            Handcrafted in the desert, shaped with love.
          </h1>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Founded in 2018, Clay &amp; Co. was born from a simple desire to create a serene sanctuary where city dwellers can disconnect from their screens and reconnect with the Earth. 
          </p>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Our light-filled, airy studio is framed by high ceilings, warm wooden shelves, and organic desert flora. We guide students in the traditional art of ceramic wheel-throwing and hand-building, celebrating the honest beauty of handmade wabi-sabi imperfections.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-ambient relative border border-outline-variant/10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYWJ6swLppUsA_F2qJI5Xzc_e_o30HcSPIPaqxXcip5GRhI8o55Ex0nZILeBOjlkjDgZbOXhtRLaaxE5D97RPg0a0wjFcNgD_kRaQMmxstjDpqfutKYkJ4NHFAwr1xNHwmeZqDVxuhSXg7S7ZLRHTIeWHvSiBjX3pV8_njEC7eB7OY1TXBErMfxNz7Na49Z-mXezdLGXu_Jwex2qMvWUR72mthtEgQURhsJ0OWbEaXK8f3_JNpzIKfHTDLu1pwrNwaGOCQE4k10cqq"
              alt="Hands on pottery wheel"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.9] select-none"
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Core values block */}
      <section className="bg-surface-container-low rounded-2xl p-8 md:p-16 mb-24 border border-outline-variant/15 shadow-card">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-3xl text-on-background">Our Pottery Philosophy</h2>
          <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
            We believe working with clay is a grounded, transformative, and quiet form of physical meditation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/5 p-4 rounded-full mb-4">
                {val.icon}
              </div>
              <h3 className="font-serif text-xl text-on-background mb-2">{val.title}</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Map/Location and FAQs block */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Location, Hours, Map Box */}
        <div className="space-y-8">
          <h2 className="font-serif text-3xl text-on-background">Visit the Studio</h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            We are nestled in the vibrant heart of the desert artisan district. Stop by to view finished student and instructor work in our gallery store, or grab a quiet tea and tour our active teaching space.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="flex items-start space-x-3.5">
              <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Address</h4>
                <p className="font-sans text-sm text-on-background mt-1 font-semibold">123 Artisan Way</p>
                <p className="font-sans text-xs text-on-surface-variant">Desert Heights, CA 92260</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Clock className="text-primary shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Hours of Peace</h4>
                <p className="font-sans text-sm text-on-background mt-1 font-semibold">Tuesday - Sunday</p>
                <p className="font-sans text-xs text-on-surface-variant">10:00 AM - 6:00 PM</p>
                <p className="font-sans text-[10px] text-on-surface-variant italic mt-0.5">Closed Mondays for kiln cleanup</p>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Map */}
          <div className="aspect-[16/9] w-full rounded-xl bg-surface-container relative overflow-hidden border border-outline-variant/20 shadow-card flex items-center justify-center group">
            {/* Soft geometric styling to represent a minimalist map */}
            <div className="absolute inset-0 bg-background/50 flex flex-col justify-between p-6 select-none">
              <div className="w-1/3 h-1 bg-outline-variant/25 rounded-full" />
              <div className="w-2/3 h-1 bg-outline-variant/25 rounded-full ml-auto" />
              <div className="w-1/2 h-1 bg-outline-variant/25 rounded-full" />
            </div>
            
            {/* Centered Map pin with radar animation */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="absolute inline-flex h-10 w-10 rounded-full bg-primary/20 animate-ping" />
              <div className="bg-primary text-on-primary p-3 rounded-full shadow-lg relative">
                <MapPin size={22} className="animate-bounce" />
              </div>
              <span className="font-serif text-sm font-semibold text-on-background mt-3">Clay &amp; Co.</span>
              <span className="font-sans text-[10px] text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded-full border border-outline-variant/10 mt-1 shadow-sm">
                Next to the Artisan Cafe
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive FAQs */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <HelpCircle className="text-primary shrink-0" size={20} />
            <h2 className="font-serif text-3xl text-on-background">Studio FAQs</h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Have a question about class preparation, clay materials, or studio rules? Find our most common questions answered below.
          </p>

          <div className="space-y-2 border-t border-outline-variant/15 pt-2">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === idx}
                onToggle={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

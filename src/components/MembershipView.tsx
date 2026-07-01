import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, HelpCircle, Sparkles, Award, Clock, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMBERSHIP_TIERS } from '../data';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const MemberFAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
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
};

export default function MembershipView() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Recommendation tool state
  const [weeklyHours, setWeeklyHours] = useState<number>(4);

  // Application form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFormTier, setSelectedFormTier] = useState('Professional');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const faqs = [
    {
      question: "What actually counts as 'Open Studio' time?",
      answer: "Open studio hours are designated blocks of time where members can utilize the wheels, handbuilding tables, glazes, and tools independently. A supervisor is always present in the space to help load/unload kiln shelves, but there is no formal instruction. It is your space to play, create, and practice."
    },
    {
      question: "Is clay included in the monthly price?",
      answer: "We sell high-quality, pre-wedged stoneware and terracotta clay by the bag ($18 - $24 per 25lb bag). Your membership fee covers all house-made high-fire glazes, oxides, slips, and the dual kiln firings (bisque and glaze) for clay purchased at our studio."
    },
    {
      question: "Can I bring a friend during my open studio hours?",
      answer: "To ensure a serene and spacious atmosphere for all active potters, open studio access is limited strictly to active members. However, Unlimited members receive one complimentary guest pass per month to bring a friend to hand-building sessions."
    },
    {
      question: "How do I upgrade or cancel my membership?",
      answer: "Memberships run on a month-to-month commitment with no long-term contracts. You can easily upgrade, downgrade, or cancel your renewal directly through an email request up to 5 days prior to your monthly billing date."
    }
  ];

  const valueProps = [
    {
      icon: <Award className="text-primary" size={24} />,
      title: "Glaze Bar & Firing Included",
      desc: "Get unlimited access to over 24 custom-formulated, food-safe high-fire glazes. Our state-of-the-art gas and electric kilns are fired weekly."
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Generous Studio Hours",
      desc: "Open studio is available 6 days a week from 10:00 AM to 9:00 PM. Unlimited level artists receive round-the-clock keycard access."
    },
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: "Personal Shelves",
      desc: "Avoid the hassle of packing up fragile greenware. Enjoy dedicated storage shelves where your works-in-progress remain completely safe."
    }
  ];

  // Helper to calculate annual discounted pricing
  const getDisplayPrice = (tierTitle: string, basePriceStr: string) => {
    const basePrice = parseInt(basePriceStr.replace('$', ''), 10);
    if (billingPeriod === 'monthly') {
      return `$${basePrice}`;
    }
    // 15% discount for annual billing
    const discountedPrice = Math.round(basePrice * 0.85);
    return `$${discountedPrice}`;
  };

  // Recommender logic
  const getRecommendedTier = (hours: number) => {
    if (hours <= 3) return 'Hobbyist';
    if (hours <= 10) return 'Professional';
    return 'Unlimited';
  };

  const recommendedTierName = getRecommendedTier(weeklyHours);

  const handleSelectTier = (tierName: string) => {
    setSelectedFormTier(tierName);
    setSelectedTier(tierName);
    // Smooth scroll down to application form
    const formElement = document.getElementById('membership-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const submission = {
        id: `membership-${Date.now()}`,
        firstName,
        lastName,
        email,
        tier: selectedFormTier,
        billing: billingPeriod,
        message,
        date: new Date().toLocaleDateString()
      };

      // Store in local storage for persistence
      const activeApplications = JSON.parse(localStorage.getItem('clay_co_memberships') || '[]');
      activeApplications.push(submission);
      localStorage.setItem('clay_co_memberships', JSON.stringify(activeApplications));

      setSubmittedMessage(`Success! Your application for the ${selectedFormTier} plan has been received. Our studio coordinators will reach out in 24 hours to arrange your orientation tour.`);
      setIsSubmitting(false);

      // Reset
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="relative">
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-20 relative z-10 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">Your Creative Haven</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-background leading-tight tracking-tight">
              A permanent shelf for your clay journey.
            </h1>
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Unlock dedicated studio access, personal storage, premium house glazes, and standard kiln firings. Choose a level that fits your practice.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <a
                href="#pricing-grid"
                className="inline-flex items-center justify-center bg-primary text-on-primary font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-primary-tint transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                View Pricing
              </a>
              <a
                href="#recommender"
                className="inline-flex items-center justify-center border border-secondary text-secondary hover:bg-secondary/5 font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full transition-all cursor-pointer"
              >
                Find Your Tier
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-ambient relative border border-outline-variant/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCR7UWtMh8XDrbHGZWq_dyUVtL8nDOtLbGf_diKnotuVc_3DRR_RJA80VrojqXuTMLggcKWHqqeK07KQjVbXzu-5hT3f3z742-QNDshAPqda9E93VuSRwPzMJRwsAUF5ibH6Z4m-qupLEeU9JilOHkmhlo9_uN72TMVKnKC3Pb_iw5fhDYkZjYPGcvhJceCD_Q_d_BnbuGoudmBp7eC13DADkxPjqHUjB0e5ZC2t0FFmzHz0Ex0vPTHYjPA5znNgXxRaEaX0g1EW3_"
                alt="Clay vessels lined up beautifully on modular warm timber studio shelves"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Perks Cards Section */}
      <section className="bg-surface-container-low py-16 md:py-24 relative z-10 border-y border-outline-variant/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-on-background">Membership Inclusions</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
              All studio members receive full access to shared tools, machinery, and community assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-card flex flex-col items-center text-center">
                <div className="bg-primary/5 p-4 rounded-full mb-5">
                  {prop.icon}
                </div>
                <h3 className="font-serif text-xl text-on-background mb-3">{prop.title}</h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Recommender */}
      <section id="recommender" className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-24 relative z-10">
        <div className="bg-surface-container rounded-2xl p-8 md:p-12 border border-outline-variant/20 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl text-on-background tracking-tight">Not sure which fits?</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Use our interactive access planner. Drag the slider to indicate how many hours you expect to spend shaping clay at the wheels each week, and we will find your optimal plan.
            </p>
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <span>Weekly Studio Hours</span>
                <span className="text-primary text-base font-serif font-semibold">{weeklyHours} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                className="w-full accent-primary bg-outline-variant/30 h-1.5 rounded-full cursor-pointer outline-none"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                <span>1 hr/wk</span>
                <span>12 hrs/wk</span>
                <span>25+ hrs/wk</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/15 shadow-ambient flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-primary-container bg-primary-container/10 px-3 py-1 rounded-full">
                Recommended For You
              </span>
              <h3 className="font-serif text-3xl text-on-background font-medium">
                {recommendedTierName} Plan
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-sm">
                {recommendedTierName === 'Hobbyist' && "Perfect for occasional hobbyists or busy professionals looking to complete 1-2 beautiful stoneware projects per month."}
                {recommendedTierName === 'Professional' && "Our most balanced tier. Great for active practitioners who want consistent wheel time and private storage for greenware."}
                {recommendedTierName === 'Unlimited' && "Best for dedicated pottery artists, instructors, or professionals looking for keycard access and kiln firing priority."}
              </p>
            </div>
            <button
              onClick={() => handleSelectTier(recommendedTierName)}
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full hover:bg-primary-tint transition-all shrink-0 shadow-sm cursor-pointer"
            >
              Select Plan
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="pricing-grid" className="bg-surface-container-low py-16 md:py-28 relative z-10 border-y border-outline-variant/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
            <div className="text-center md:text-left max-w-md">
              <h2 className="font-serif text-3xl md:text-4xl text-on-background">Studio Plans</h2>
              <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
                Simple, transparent membership pricing. Cancel or pause anytime with 5 days' notice.
              </p>
            </div>
            
            {/* Toggle Billing Period */}
            <div className="flex bg-surface-container p-1 rounded-full border border-outline-variant/15 shrink-0 select-none">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  billingPeriod === 'monthly'
                    ? 'bg-surface-bright text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-background'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annually')}
                className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-250 flex items-center gap-1.5 cursor-pointer ${
                  billingPeriod === 'annually'
                    ? 'bg-surface-bright text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-background'
                }`}
              >
                Annually
                <span className="bg-secondary text-on-secondary text-[9px] font-semibold tracking-normal px-1.5 py-0.5 rounded-full shrink-0">
                  -15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {MEMBERSHIP_TIERS.map((tier) => {
              const isSelected = selectedFormTier === tier.title;
              return (
                <div
                  key={tier.id}
                  className={`bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-card border hover:shadow-ambient transition-all duration-300 relative overflow-hidden ${
                    tier.isRecommended ? 'border-primary shadow-ambient md:-translate-y-2' : 'border-outline-variant/10'
                  }`}
                >
                  {tier.isRecommended && (
                    <div className="absolute top-0 right-0 bg-primary text-on-primary font-sans text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
                      <Sparkles size={10} />
                      Recommended
                    </div>
                  )}
                  <h3 className="font-serif text-2xl text-on-background mb-1">{tier.title}</h3>
                  <div className="text-primary font-serif text-3xl font-medium mb-1.5">
                    {getDisplayPrice(tier.title, tier.price)}
                    <span className="text-xs font-sans text-on-surface-variant font-normal"> / month</span>
                  </div>
                  <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider mb-6">
                    {billingPeriod === 'monthly' ? 'Billed monthly' : 'Billed annually, save 15%'}
                  </p>
                  <ul className="space-y-4 mb-8 font-sans text-xs text-on-surface-variant flex-grow border-t border-outline-variant/10 pt-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3 leading-relaxed">
                        <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={15} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectTier(tier.title)}
                    className={`w-full font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-secondary text-on-secondary shadow-md hover:bg-secondary/95'
                        : tier.isRecommended
                        ? 'bg-primary text-on-primary hover:bg-primary-tint shadow-sm hover:shadow'
                        : 'border border-secondary text-secondary hover:bg-secondary/5'
                    }`}
                  >
                    {isSelected ? 'Plan Selected' : `Choose ${tier.title}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Application Form */}
      <section id="membership-application-form" className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl text-on-background leading-tight">
              Begin your studio residency.
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              We vet and guide every member through a brief 30-minute studio and kiln orientation. This maintains a clean, safe, and respectful workspace for all practicing community artists.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex items-start gap-4">
              <Heart className="text-primary shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <p className="font-serif text-sm font-semibold text-on-background">Orientations are held weekly</p>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Orientations occur every Wednesday evening and Saturday morning. Once approved, you can start potting immediately!
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-ambient border border-outline-variant/15 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!submittedMessage ? (
                <motion.form
                  key="membershipForm"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="mFirstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="mFirstName"
                        placeholder="Elena"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: '' });
                        }}
                        className={`border-b bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors ${
                          formErrors.firstName ? 'border-red-400' : 'border-outline-variant'
                        }`}
                      />
                      {formErrors.firstName && (
                        <span className="text-[10px] text-red-500 font-medium mt-1">{formErrors.firstName}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="mLastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="mLastName"
                        placeholder="Rostova"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          if (formErrors.lastName) setFormErrors({ ...formErrors, lastName: '' });
                        }}
                        className={`border-b bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors ${
                          formErrors.lastName ? 'border-red-400' : 'border-outline-variant'
                        }`}
                      />
                      {formErrors.lastName && (
                        <span className="text-[10px] text-red-500 font-medium mt-1">{formErrors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="mEmail">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="mEmail"
                      placeholder="elena@studio.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      className={`border-b bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors ${
                        formErrors.email ? 'border-red-400' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-red-500 font-medium mt-1">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="mTierSelect">
                      Select Desired Membership Tier
                    </label>
                    <select
                      id="mTierSelect"
                      value={selectedFormTier}
                      onChange={(e) => {
                        setSelectedFormTier(e.target.value);
                        setSelectedTier(e.target.value);
                      }}
                      className="border-b border-outline-variant bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="Hobbyist">Hobbyist ({getDisplayPrice('Hobbyist', '60')}/mo)</option>
                      <option value="Professional">Professional ({getDisplayPrice('Professional', '160')}/mo)</option>
                      <option value="Unlimited">Unlimited ({getDisplayPrice('Unlimited', '260')}/mo)</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="mMessage">
                      Your Pottery Goals or Clay Experience
                    </label>
                    <textarea
                      id="mMessage"
                      placeholder="Are you looking to throw, hand-build, glaze, or run masterclasses?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="border-b border-outline-variant bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary font-sans text-xs font-semibold tracking-wider uppercase py-4 rounded-full hover:bg-primary-tint transition-all cursor-pointer shadow flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                        Processing Application...
                      </>
                    ) : (
                      `Apply for ${selectedFormTier} membership`
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="mSuccessMessage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center bg-secondary-container text-on-secondary-container w-16 h-16 rounded-full mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif text-2xl text-on-background mb-3">Application Received</h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto mb-6 leading-relaxed">
                    {submittedMessage}
                  </p>
                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="border border-secondary text-secondary hover:bg-secondary/5 font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-all"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Membership FAQs */}
      <section className="bg-surface-container-low py-16 md:py-24 relative z-10 border-t border-outline-variant/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="text-primary shrink-0" size={20} />
              <h2 className="font-serif text-3xl text-on-background">Membership FAQs</h2>
            </div>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Have questions about how studio space bookings, material fees, kiln usage, or memberships work? Find key answers here.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {faqs.map((faq, idx) => (
              <MemberFAQItem
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

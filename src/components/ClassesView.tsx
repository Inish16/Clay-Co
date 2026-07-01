import React, { useState, useRef, useEffect } from 'react';
import { Clock, CreditCard, Calendar, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_CLASSES, MEMBERSHIP_TIERS } from '../data';
import { BookingSubmission } from '../types';

interface ClassesViewProps {
  onClassBookTrigger?: { selectedClass: string; timestamp: number } | null;
}

export default function ClassesView({ onClassBookTrigger }: ClassesViewProps) {
  // Booking Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [classInterest, setClassInterest] = useState('Beginner Foundations');
  const [message, setMessage] = useState('');
  
  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Membership modal/notification state
  const [joinedMembership, setJoinedMembership] = useState<string | null>(null);

  // Refs for smooth scrolling
  const classesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Handle external trigger (e.g. from app-level or "Book Now" click)
  useEffect(() => {
    if (onClassBookTrigger) {
      if (onClassBookTrigger.selectedClass) {
        setClassInterest(onClassBookTrigger.selectedClass);
      }
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [onClassBookTrigger]);

  const scrollToClasses = (e: React.MouseEvent) => {
    e.preventDefault();
    classesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClassSelection = (className: string) => {
    setClassInterest(className);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    
    // Simulate API request
    setTimeout(() => {
      const newBooking: BookingSubmission = {
        id: `booking-${Date.now()}`,
        firstName,
        lastName,
        email,
        classInterest,
        message,
        submittedAt: new Date().toLocaleDateString()
      };

      // Save to localStorage for persistent state representation
      const currentBookings = JSON.parse(localStorage.getItem('clay_co_bookings') || '[]');
      currentBookings.push(newBooking);
      localStorage.setItem('clay_co_bookings', JSON.stringify(currentBookings));

      setSubmittedBooking(newBooking);
      setIsSubmitting(false);

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const handleJoinMembership = (tierTitle: string) => {
    setJoinedMembership(tierTitle);
    setTimeout(() => {
      setJoinedMembership(null);
    }, 4500);
  };

  return (
    <div className="relative">
      {/* Dynamic Success Notification for Memberships */}
      <AnimatePresence>
        {joinedMembership && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 border border-secondary-container max-w-md w-11/12"
          >
            <CheckCircle2 className="text-secondary-container shrink-0" size={24} />
            <div>
              <p className="font-semibold text-sm">Welcome to the clay community!</p>
              <p className="text-xs text-secondary-container/90 mt-0.5">
                Your request to join as a <span className="font-semibold">{joinedMembership}</span> has been simulated. We have sent information to your email.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-5 flex flex-col space-y-6 md:space-y-8 z-10 relative">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-background leading-tight tracking-tight">
              Shape your peace in mud and motion.
            </h1>
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-md leading-relaxed">
              Join our serene studio space to learn the grounding art of wheel-throwing. Classes for absolute beginners to seasoned artisans.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToClasses}
                className="inline-flex items-center justify-center bg-primary text-on-primary font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-primary-tint transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Explore Classes
              </button>
            </div>
          </div>
          <div className="md:col-span-7 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative shadow-ambient bg-surface-container-low border border-outline-variant/10">
              <img
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
                alt="A potter's hands covered in wet, greyish-brown clay, shaping a rotating vessel on a pottery wheel under soft natural studio lighting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYWJ6swLppUsA_F2qJI5Xzc_e_o30HcSPIPaqxXcip5GRhI8o55Ex0nZILeBOjlkjDgZbOXhtRLaaxE5D97RPg0a0wjFcNgD_kRaQMmxstjDpqfutKYkJ4NHFAwr1xNHwmeZqDVxuhSXg7S7ZLRHTIeWHvSiBjX3pV8_njEC7eB7OY1TXBErMfxNz7Na49Z-mXezdLGXu_Jwex2qMvWUR72mthtEgQURhsJ0OWbEaXK8f3_JNpzIKfHTDLu1pwrNwaGOCQE4k10cqq"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid Section */}
      <section ref={classesRef} id="classes" className="bg-surface-container-low py-16 md:py-28 relative z-10 border-y border-outline-variant/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="mb-12 md:mb-16 text-center md:text-left max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl text-on-background">Studio Sessions</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
              Find a beautiful hand-throwing class that meets you exactly where you are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STUDIO_CLASSES.map((studioClass) => (
              <div
                key={studioClass.id}
                className="bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col shadow-card border border-outline-variant/10 hover:shadow-ambient transition-all duration-300 relative overflow-hidden"
              >
                {studioClass.isPopular && (
                  <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary font-sans text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-lg flex items-center gap-1">
                    <Sparkles size={10} />
                    Popular
                  </div>
                )}
                <div className="mb-6 aspect-video rounded-lg overflow-hidden relative border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    alt={studioClass.title}
                    src={studioClass.imageUrl}
                  />
                </div>
                <h3 className="font-serif text-2xl text-on-background mb-3">{studioClass.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">
                  {studioClass.description}
                </p>
                <ul className="space-y-3.5 mb-8 font-sans text-xs text-on-surface-variant border-t border-outline-variant/10 pt-5">
                  <li className="flex items-center space-x-3">
                    <Clock className="text-secondary shrink-0" size={16} />
                    <span>{studioClass.duration}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CreditCard className="text-secondary shrink-0" size={16} />
                    <span>{studioClass.price}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Calendar className="text-secondary shrink-0" size={16} />
                    <span>{studioClass.schedule}</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleClassSelection(studioClass.bookingCode)}
                  className={`w-full font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer ${
                    studioClass.isPopular
                      ? 'bg-primary text-on-primary hover:bg-primary-tint shadow-sm hover:shadow'
                      : 'border border-secondary text-secondary hover:bg-secondary/5'
                  }`}
                >
                  Book {studioClass.title.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={formRef} className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          
          {/* Form left Column */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl text-on-background leading-tight">
              Reserve your spot at the wheel.
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Classes are kept intentionally small to ensure highly personalized, quiet guidance. Use the form to request a booking or inquire about private group and team building sessions.
            </p>

            {/* Testimonial container */}
            <div className="bg-surface-container p-6 md:p-8 rounded-xl relative border border-outline-variant/20 shadow-card">
              <Quote className="text-primary/10 absolute top-4 left-4" size={40} />
              <p className="font-serif text-base text-on-surface italic relative z-10 pl-6 pt-2 leading-relaxed">
                "Taking the beginner class was the most grounding experience I've had all year. The studio is a haven of calm, and the instructors are incredibly patient."
              </p>
              <p className="font-sans text-xs font-semibold text-primary mt-4 pl-6">— Sarah J., Beginner Alum</p>
            </div>
          </div>

          {/* Form right Column */}
          <div className="bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-ambient border border-outline-variant/15 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!submittedBooking ? (
                <motion.form
                  key="bookingForm"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Jane"
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
                      <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Doe"
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
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jane@example.com"
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
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="classSelect">
                      Select Class Interest
                    </label>
                    <select
                      id="classSelect"
                      value={classInterest}
                      onChange={(e) => setClassInterest(e.target.value)}
                      className="border-b border-outline-variant bg-transparent py-2.5 outline-none font-sans text-sm text-on-background focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="Beginner Foundations">Beginner Foundations</option>
                      <option value="Intermediate Forms">Intermediate Forms</option>
                      <option value="Advanced Masterclass">Advanced Masterclass</option>
                      <option value="Private Group Session">Private Group Session</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="message">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      placeholder="Any specific dates or goals in mind?"
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
                        Processing...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="successMessage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center bg-secondary-container text-on-secondary-container w-16 h-16 rounded-full mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif text-2xl text-on-background mb-3">Request Submitted</h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-on-background">{submittedBooking.firstName}</span>! We have recorded your interest in <span className="font-semibold text-on-background">{submittedBooking.classInterest}</span> and will reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmittedBooking(null)}
                    className="border border-secondary text-secondary hover:bg-secondary/5 font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-all"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Studio Memberships Section */}
      <section id="memberships" className="border-t border-outline-variant/15 py-16 md:py-28 relative z-10 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="mb-12 md:mb-16 text-center md:text-left max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl text-on-background">Studio Memberships</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
              Join our supportive local community and deepen your independent practice at the wheels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-card border border-outline-variant/10 hover:shadow-ambient transition-all duration-300 relative overflow-hidden"
              >
                {tier.isRecommended && (
                  <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-sans text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-lg">
                    Recommended
                  </div>
                )}
                <h3 className="font-serif text-2xl text-on-background mb-1">{tier.title}</h3>
                <div className="text-primary font-serif text-3xl font-medium mb-6">
                  {tier.price}
                  <span className="text-xs font-sans text-on-surface-variant font-normal"> / month</span>
                </div>
                <ul className="space-y-4 mb-8 font-sans text-xs text-on-surface-variant flex-grow border-t border-outline-variant/10 pt-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3 leading-relaxed">
                      <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleJoinMembership(tier.title)}
                  className={`w-full font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer ${
                    tier.isRecommended
                      ? 'bg-primary text-on-primary hover:bg-primary-tint shadow-sm hover:shadow'
                      : 'border border-secondary text-secondary hover:bg-secondary/5'
                  }`}
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

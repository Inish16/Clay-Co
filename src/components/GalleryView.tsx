import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Heart, MessageSquare, X, Send, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Vases' | 'Tableware' | 'Sculptures'>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Working Likes state map: item.id -> number
  const [likesMap, setLikesMap] = useState<{ [key: string]: number }>(
    GALLERY_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  
  // User liked state map: item.id -> boolean
  const [userLikedMap, setUserLikedMap] = useState<{ [key: string]: boolean }>({});

  // Real-time custom comment state map: item.id -> array of comments
  const [commentsMap, setCommentsMap] = useState<{ [key: string]: { author: string; text: string; date: string }[] }>({
    'gallery-1': [
      { author: 'Jane D.', text: 'The earthy orange showing through at the base is so stunning!', date: 'Today' }
    ],
    'gallery-2': [
      { author: 'Alex K.', text: 'Perfect shape! It is so difficult to stack them this neatly.', date: 'Yesterday' }
    ]
  });

  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const filterCategories: ('All' | 'Vases' | 'Tableware' | 'Sculptures')[] = [
    'All', 'Vases', 'Tableware', 'Sculptures'
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleLikeClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal if clicked on card likes
    const hasLiked = userLikedMap[itemId];
    
    setLikesMap((prev) => ({
      ...prev,
      [itemId]: hasLiked ? prev[itemId] - 1 : prev[itemId] + 1
    }));
    
    setUserLikedMap((prev) => ({
      ...prev,
      [itemId]: !hasLiked
    }));
  };

  const handleAddComment = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const author = newCommentAuthor.trim() || 'Anonymous Collector';
    const text = newCommentText.trim();
    
    const newComment = {
      author,
      text,
      date: 'Just now'
    };

    setCommentsMap((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), newComment]
    }));

    setNewCommentAuthor('');
    setNewCommentText('');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-24 relative z-10">
      {/* Header Section */}
      <section className="mb-12 md:mb-20 text-center md:text-left max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-on-background mb-6 leading-tight">
          Student Gallery
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
          A curated collection of pieces crafted by our talented community. Each piece reflects hours of patience, learning, and the quiet joy of working with clay.
        </p>
      </section>

      {/* Filters Section */}
      <section className="mb-12 flex flex-wrap gap-3 items-center justify-center md:justify-start">
        {filterCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-tertiary text-on-tertiary shadow-ambient'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat === 'All' ? 'All Work' : cat}
            </button>
          );
        })}
      </section>

      {/* Gallery Grid */}
      <motion.section 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isUserLiked = userLikedMap[item.id];
            const currentLikes = likesMap[item.id] || 0;
            const commentsCount = (commentsMap[item.id] || []).length;

            return (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-xl overflow-hidden bg-surface-container-low shadow-card hover:shadow-ambient transition-all duration-300 border border-outline-variant/10 relative"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    alt={item.title}
                    src={item.imageUrl}
                  />
                  
                  {/* Subtle Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-on-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-sans text-[10px] font-semibold tracking-wider uppercase text-surface-bright/80 mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl text-surface-bright mb-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-surface-bright/90 italic mb-4">
                      "{item.studentQuote}"
                    </p>
                    <div className="flex justify-between items-center text-xs text-surface-bright/80 border-t border-surface-bright/10 pt-3">
                      <span>Crafted by {item.studentName}</span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <Heart size={14} className={isUserLiked ? "fill-red-400 text-red-400" : ""} />
                          {currentLikes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          {commentsCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standard Static Footer Details on Mobile (when overlay is hidden) */}
                  <div className="md:hidden bg-surface-container-lowest p-4 flex justify-between items-center border-t border-outline-variant/10">
                    <div>
                      <h4 className="font-serif text-base font-semibold text-on-background">{item.title}</h4>
                      <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">{item.category} • {item.studentName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLikeClick(item.id, e)}
                        className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        <Heart size={14} className={isUserLiked ? "fill-red-400 text-red-400" : ""} />
                        <span>{currentLikes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.section>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-on-background/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            {/* Backdrop Dismiss */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedItem(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface-bright w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-on-background/10 hover:bg-on-background/20 text-on-background rounded-full p-2 transition-colors z-20 cursor-pointer"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Left Column: Image */}
              <div className="w-full lg:w-1/2 relative bg-surface-container">
                <img
                  className="w-full h-full object-cover select-none max-h-[45vh] lg:max-h-full aspect-square"
                  referrerPolicy="no-referrer"
                  alt={selectedItem.title}
                  src={selectedItem.imageUrl}
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {selectedItem.category}
                </div>
              </div>

              {/* Right Column: Interactive details, likes & comments */}
              <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-full">
                <div>
                  <div className="mb-4">
                    <span className="font-sans text-xs text-on-surface-variant">Community Craft Spotlight</span>
                    <h2 className="font-serif text-3xl text-on-background tracking-tight mt-1">{selectedItem.title}</h2>
                    <p className="font-sans text-xs text-primary font-semibold mt-1">Crafted by {selectedItem.studentName}</p>
                  </div>

                  {/* Student's quote block */}
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20 italic font-serif text-sm text-on-surface mb-6 leading-relaxed">
                    "{selectedItem.studentQuote}"
                  </div>

                  {/* Comments section */}
                  <div className="mb-6">
                    <h3 className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                      Appreciations ({(commentsMap[selectedItem.id] || []).length})
                    </h3>
                    <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-2 border-t border-outline-variant/10 pt-3">
                      {(commentsMap[selectedItem.id] || []).length === 0 ? (
                        <p className="font-sans text-xs text-on-surface-variant italic py-2">
                          No notes left yet. Be the first to compliment this piece!
                        </p>
                      ) : (
                        (commentsMap[selectedItem.id] || []).map((comm, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="font-semibold text-on-background">{comm.author}</span>
                              <span className="text-[10px] text-on-surface-variant">{comm.date}</span>
                            </div>
                            <p className="font-sans text-on-surface-variant leading-relaxed bg-surface-container-low p-2.5 rounded-lg mt-1">
                              {comm.text}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Interactive Likes & new comment input */}
                <div className="border-t border-outline-variant/20 pt-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-sans text-xs text-on-surface-variant font-medium">
                      Would you like to support their learning journey?
                    </span>
                    <button
                      onClick={(e) => handleLikeClick(selectedItem.id, e)}
                      className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                        userLikedMap[selectedItem.id]
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      <Heart size={14} className={userLikedMap[selectedItem.id] ? "fill-red-500 text-red-500 animate-pulse" : ""} />
                      <span>{likesMap[selectedItem.id]} Likes</span>
                    </button>
                  </div>

                  {/* Add comment Form */}
                  <form onSubmit={(e) => handleAddComment(selectedItem.id, e)} className="flex gap-2 items-end">
                    <div className="flex-grow flex flex-col gap-1">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={newCommentAuthor}
                        onChange={(e) => setNewCommentAuthor(e.target.value)}
                        className="bg-transparent border-b border-outline-variant py-1 text-xs outline-none focus:border-primary text-on-background"
                      />
                      <input
                        type="text"
                        placeholder="Say something nice..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="bg-transparent border-b border-outline-variant py-2 text-xs outline-none focus:border-primary text-on-background font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary text-on-secondary hover:bg-on-secondary-container rounded-full p-2.5 shrink-0 transition-all cursor-pointer shadow-sm hover:shadow"
                      aria-label="Send appreciation"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

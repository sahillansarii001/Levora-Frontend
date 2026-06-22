'use client';

import { useState, useEffect, useMemo } from 'react';
import SectionHeading from '../shared/SectionHeading';
import { Search, BookOpen, Layers, FileText } from 'lucide-react';
import { fetchMaterials } from '@/lib/api';
import ChapterAccordion from './ChapterAccordion';
import { motion, AnimatePresence } from 'framer-motion';

const CLASS_OPTIONS = ['9th', '10th', '11th', '12th'];
const SUBJECTS_9_10 = ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer'];
const SUBJECTS_11_12 = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'];

export default function MaterialsGrid({ title, subtitle }) {
  const [selectedClass, setSelectedClass] = useState('11th');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'textbooks'
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update subjects list when class changes
  const currentSubjects = ['11th', '12th'].includes(selectedClass) ? SUBJECTS_11_12 : SUBJECTS_9_10;

  // Auto-select first subject if current subject is not in the new class's list
  useEffect(() => {
    if (!currentSubjects.includes(selectedSubject)) {
      setSelectedSubject(currentSubjects[0]);
    }
  }, [selectedClass, currentSubjects, selectedSubject]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchMaterials();
      setMaterials(data);
      setLoading(false);
    };
    loadData();
    // Removed aggressive polling
    
  }, []);

  const groupedMaterials = useMemo(() => {
    // Separate by category
    const sourceData = materials.filter(m => 
      activeTab === 'textbooks' ? m.category === 'textbook' : m.category !== 'textbook'
    );
    
    // 1. Filter by class and subject
    let filtered = sourceData.filter(m => {
      // Mock logic for demo if className is missing from DB items: 
      // treat items without className as '11th' and without subject as 'Physics'
      const mClass = m.className || '11th';
      const mSubj = m.subject || 'Physics';
      
      const matchesClass = mClass === selectedClass;
      const matchesSubject = mSubj === selectedSubject;
      const matchesSearch = m.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.lesson?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesClass && matchesSubject && matchesSearch;
    });

    // 2. Group by lesson (chapter)
    const groups = {};
    filtered.forEach(item => {
      const chapter = item.lesson || 'General Materials';
      if (!groups[chapter]) {
        groups[chapter] = [];
      }
      groups[chapter].push(item);
    });

    return groups;
  }, [materials, selectedClass, selectedSubject, searchQuery, activeTab]);

  return (
    <section className="pt-28 pb-28 bg-white min-h-screen relative overflow-hidden">
      {/* Background embellishments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-sky)]/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Study Materials & Textbooks"} 
          subtitle={subtitle || "Access premium Levora notes, interactive textbooks, formula sheets, and question banks."}
          centered
        />

        {/* Class Selection Tabs */}
        <div className="flex justify-center mb-10 mt-8">
          <div className="flex flex-wrap justify-center bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-1 sm:gap-0">
            {CLASS_OPTIONS.map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                  selectedClass === cls
                    ? 'bg-white text-[var(--color-navy)] shadow-md border border-slate-100'
                    : 'text-slate-500 hover:text-[var(--color-navy)] hover:bg-slate-100'
                }`}
              >
                <Layers size={16} className={selectedClass === cls ? 'text-[var(--color-gold)]' : 'text-slate-400'} />
                Class {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject & Search Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-6 bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-4 w-full xl:w-auto">
            {/* Notes vs Textbooks Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-max">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition-all ${
                  activeTab === 'notes' ? 'bg-white text-[var(--color-navy)] shadow-sm' : 'text-slate-500 hover:text-[var(--color-navy)]'
                }`}
              >
                <FileText size={16} /> Levora Notes
              </button>
              <button
                onClick={() => setActiveTab('textbooks')}
                className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition-all ${
                  activeTab === 'textbooks' ? 'bg-white text-[var(--color-navy)] shadow-sm' : 'text-slate-500 hover:text-[var(--color-navy)]'
                }`}
              >
                <BookOpen size={16} /> Textbooks
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentSubjects.map(sub => (
                <button 
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    selectedSubject === sub 
                      ? 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-[var(--color-navy)] shadow-lg shadow-amber-200/40 translate-y-[-2px]' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-[var(--color-gold)]/30 hover:bg-white hover:text-[var(--color-navy)]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative w-full xl:w-80 flex-shrink-0 mt-4 xl:mt-0">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${selectedSubject}...`} 
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[var(--color-gold)]/10 focus:bg-white transition-all text-sm font-medium" 
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 rounded-full border-4 border-[var(--color-gold)] border-t-transparent animate-spin mb-4 shadow-lg" />
            <p className="text-lg font-bold text-[var(--color-navy)]">Loading {activeTab}...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {Object.keys(groupedMaterials).length > 0 ? (
                Object.entries(groupedMaterials).map(([chapter, items], idx) => (
                  <motion.div
                    key={chapter + activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ChapterAccordion 
                      chapterName={chapter} 
                      materials={items} 
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100"
                >
                  <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm mb-4">
                    <BookOpen size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">No {activeTab} found</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We are currently updating our repository for Class {selectedClass} {selectedSubject}. 
                    Check back soon for premium notes and textbook resources!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

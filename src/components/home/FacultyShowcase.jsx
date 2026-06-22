'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import FacultyCard from '@/components/shared/FacultyCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchFaculty } from '@/lib/api';

export default function FacultyShowcase() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const data = await fetchFaculty();
        // Get up to 4 active faculties for the showcase
        setFaculties(data.filter(f => f.status === 'active').slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch faculty:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFaculty();
  }, []);

  if (!loading && faculties.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Learn from the Best" 
            subtitle="Our faculty comprises top educators and industry experts dedicated to your success."
          />
          <Link prefetch={false}href="/faculty" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors pb-6 group">
            View All Faculty <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center p-12 text-slate-400">Loading faculty...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculties.map((faculty, index) => (
              <motion.div
                key={faculty._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <FacultyCard faculty={faculty} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
          <Link prefetch={false}href="/faculty" className="btn-outline w-full inline-block">
            View All Faculty
          </Link>
        </div>
      </div>
    </section>
  );
}

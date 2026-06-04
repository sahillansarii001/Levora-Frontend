'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import FacultyCard from '@/components/shared/FacultyCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const faculties = [
  { id: 1, name: "Dr. A. Sharma", subject: "Physics", experience: "15+ Years", specialization: "JEE Advanced Expert" },
  { id: 2, name: "Prof. R. Verma", subject: "Mathematics", experience: "12+ Years", specialization: "Olympiad Mentor" },
  { id: 3, name: "Mrs. S. Gupta", subject: "Chemistry", experience: "10+ Years", specialization: "NEET Top Ranker Maker" },
  { id: 4, name: "Mr. K. Iyer", subject: "Computer Science", experience: "8+ Years", specialization: "Python & AI Expert" },
];

export default function FacultyShowcase() {
  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14">
          <SectionHeading 
            title="Learn from the Best" 
            subtitle="Our faculty comprises top educators and industry experts dedicated to your success."
          />
          <Link href="/faculty" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors pb-6 group">
            View All Faculty <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <FacultyCard faculty={faculty} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/faculty" className="btn-outline w-full inline-block">
            View All Faculty
          </Link>
        </div>
      </div>
    </section>
  );
}

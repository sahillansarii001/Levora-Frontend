'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import FacultyCard from '@/components/shared/FacultyCard';
import Link from 'next/link';

const faculties = [
  { id: 1, name: "Dr. A. Sharma", subject: "Physics", experience: "15+ Years", specialization: "JEE Advanced Expert" },
  { id: 2, name: "Prof. R. Verma", subject: "Mathematics", experience: "12+ Years", specialization: "Olympiad Mentor" },
  { id: 3, name: "Mrs. S. Gupta", subject: "Chemistry", experience: "10+ Years", specialization: "NEET Top Ranker Maker" },
  { id: 4, name: "Mr. K. Iyer", subject: "Computer Science", experience: "8+ Years", specialization: "Python & AI Expert" },
];

export default function FacultyShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Learn from the Best" 
            subtitle="Our faculty comprises top educators and industry experts dedicated to your success."
          />
          <Link href="/faculty" className="hidden md:inline-block text-sm font-semibold text-navy hover:text-gold transition-colors pb-6">
            View All Faculty &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 15 }}
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

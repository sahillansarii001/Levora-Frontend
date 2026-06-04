'use client';

import { useState, useEffect } from 'react';
import SectionHeading from '../shared/SectionHeading';
import FacultyCard from '../shared/FacultyCard';
import { fetchFaculty } from '@/lib/api';

export default function FacultyGrid({ title, subtitle }) {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaculty = async () => {
      const data = await fetchFaculty();
      const mapped = data.map(f => ({
        ...f,
        experience: f.experience + "+ Years",
        specialization: f.qualification
      }));
      setFaculties(mapped);
      setLoading(false);
    };
    loadFaculty();
    const interval = setInterval(loadFaculty, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-28 pb-28 bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Our Expert Faculty"} 
          subtitle={subtitle || "Meet the brilliant minds dedicated to shaping your future."}
          centered
        />
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 rounded-full border-2 border-[var(--color-gold)] border-t-transparent animate-spin mb-4" />
            <p className="text-lg font-bold text-[var(--color-navy)]">Loading faculty...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {faculties.length > 0 ? faculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            )) : (
              <div className="col-span-full text-center py-20 text-slate-400 font-medium">
                No faculty members found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

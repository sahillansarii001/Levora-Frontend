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
    const interval = setInterval(loadFaculty, 3000); // Real-time polling
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Our Expert Faculty"} 
          subtitle={subtitle || "Meet the brilliant minds dedicated to shaping your future."}
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {faculties.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>
    </section>
  );
}

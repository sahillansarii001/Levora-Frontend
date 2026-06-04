import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

export default function CourseDetailsPage({ params }) {
  const { id } = params;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link href="/courses" className="inline-flex items-center text-slate-500 hover:text-navy mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Courses
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
            Course ID: {id}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-poppins">Course Details Coming Soon</h1>
          
          <p className="text-lg text-slate-600 mb-8">
            We are currently updating the detailed syllabus and schedule for this course. Please check back later or contact our admissions office for immediate assistance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-50 p-6 rounded-xl flex flex-col items-center text-center">
              <BookOpen size={32} className="text-gold mb-3" />
              <h3 className="font-bold text-slate-800">Curriculum</h3>
              <p className="text-sm text-slate-500 mt-1">Comprehensive study material provided.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl flex flex-col items-center text-center">
              <Clock size={32} className="text-blue-500 mb-3" />
              <h3 className="font-bold text-slate-800">Duration</h3>
              <p className="text-sm text-slate-500 mt-1">Flexible batches available.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl flex flex-col items-center text-center">
              <Tag size={32} className="text-green-500 mb-3" />
              <h3 className="font-bold text-slate-800">Pricing</h3>
              <p className="text-sm text-slate-500 mt-1">Contact for current fee structure.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-outline px-8 py-3 text-center">
              Contact Us
            </Link>
            <Link href="/admissions" className="btn-primary px-8 py-3 text-center">
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustStats from '@/components/home/TrustStats';
import RichTextSection from '@/components/home/RichTextSection';
import FaqSection from '@/components/home/FaqSection';
import GallerySection from '@/components/home/GallerySection';
import ProgramsSection from '@/components/home/ProgramsSection';
import WhyLevora from '@/components/home/WhyLevora';
import FacultyShowcase from '@/components/home/FacultyShowcase';
import ResultsSection from '@/components/home/ResultsSection';
import Testimonials from '@/components/home/Testimonials';
import NotesSystem from '@/components/home/NotesSystem';
import CodingCourses from '@/components/home/CodingCourses';

// New Page Widgets
import AboutVision from './about/AboutVision';
import AboutFounder from './about/AboutFounder';
import ContactInfo from './contact/ContactInfo';
import ContactForm from './contact/ContactForm';
import CoursesGrid from './courses/CoursesGrid';
import FacultyGrid from './faculty/FacultyGrid';
import ResultsGrid from './results/ResultsGrid';
import MaterialsGrid from './materials/MaterialsGrid';

export default function DynamicRenderer({ content, pageName = 'homepage' }) {
  const sectionsMap = {};
  
  Object.keys(content).forEach(key => {
    if (key.startsWith(`${pageName}.`)) {
      const parts = key.split('.');
      if (parts.length >= 3) {
        const sectionId = parts[1];
        const field = parts.slice(2).join('.');
        
        if (!sectionsMap[sectionId]) {
          let type = 'unknown';
          if (sectionId.startsWith('hero')) type = 'hero';
          else if (sectionId.startsWith('text')) type = 'text';
          else if (sectionId.startsWith('stats')) type = 'stats';
          else if (sectionId.startsWith('faq')) type = 'faq';
          else if (sectionId.startsWith('gallery')) type = 'gallery';
          else if (sectionId.startsWith('programs')) type = 'programs';
          else if (sectionId.startsWith('why')) type = 'why';
          else if (sectionId.startsWith('notes')) type = 'notes';
          else if (sectionId.startsWith('faculty_showcase')) type = 'faculty_showcase';
          else if (sectionId.startsWith('results_showcase')) type = 'results_showcase';
          else if (sectionId.startsWith('coding')) type = 'coding';
          else if (sectionId.startsWith('testimonials')) type = 'testimonials';
          else if (sectionId.startsWith('about_vision')) type = 'about_vision';
          else if (sectionId.startsWith('about_founder')) type = 'about_founder';
          else if (sectionId.startsWith('contact_info')) type = 'contact_info';
          else if (sectionId.startsWith('contact_form')) type = 'contact_form';
          else if (sectionId.startsWith('courses_grid')) type = 'courses_grid';
          else if (sectionId.startsWith('faculty_grid')) type = 'faculty_grid';
          else if (sectionId.startsWith('results_grid')) type = 'results_grid';
          else if (sectionId.startsWith('materials_grid')) type = 'materials_grid';
          
          sectionsMap[sectionId] = { id: sectionId, type, data: {} };
        }
        sectionsMap[sectionId].data[field] = content[key];
      }
    }
  });

  const sections = Object.values(sectionsMap);

  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map(section => {
        switch(section.type) {
          case 'hero':
            return <HeroSection key={section.id} title={section.data.title} subtitle={section.data.subtitle} bg_image={section.data.bg_image} />;
          case 'stats':
            return <TrustStats key={section.id} students={section.data.stat_1_value} success={section.data.stat_2_value} />;
          case 'text':
            return <RichTextSection key={section.id} title={section.data.title} content={section.data.content} />;
          case 'faq':
            return <FaqSection key={section.id} question={section.data.question} answer={section.data.answer} />;
          case 'gallery':
            return <GallerySection key={section.id} title={section.data.title} image1={section.data.image_url_1} image2={section.data.image_url_2} />;
          case 'programs':
            return <ProgramsSection key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'why':
            return <WhyLevora key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'notes':
            return <NotesSystem key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'faculty_showcase':
            return <FacultyShowcase key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'results_showcase':
            return <ResultsSection key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'coding':
            return <CodingCourses key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'testimonials':
            return <Testimonials key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'about_vision':
            return <AboutVision key={section.id} vision_title={section.data.vision_title} vision_content={section.data.vision_content} mission_title={section.data.mission_title} mission_content={section.data.mission_content} />;
          case 'about_founder':
            return <AboutFounder key={section.id} founder_title={section.data.founder_title} founder_message={section.data.founder_message} founder_name={section.data.founder_name} founder_role={section.data.founder_role} founder_image={section.data.founder_image} />;
          case 'contact_info':
            return <ContactInfo key={section.id} title={section.data.title} subtitle={section.data.subtitle} address={section.data.address} phone={section.data.phone} email={section.data.email} />;
          case 'contact_form':
            return <ContactForm key={section.id} form_title={section.data.form_title} />;
          case 'courses_grid':
            return <CoursesGrid key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'faculty_grid':
            return <FacultyGrid key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'results_grid':
            return <ResultsGrid key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          case 'materials_grid':
            return <MaterialsGrid key={section.id} title={section.data.title} subtitle={section.data.subtitle} />;
          default:
            return null;
        }
      })}
    </>
  );
}

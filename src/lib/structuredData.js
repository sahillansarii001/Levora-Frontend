export const generateEducationalOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Levora Academy",
    "url": "https://levoraacademy.vercel.app",
    "logo": "https://levoraacademy.vercel.app/Logo.png",
    "description": "Levora Academy provides expert coaching for JEE, NEET, Class 1–12, Coding, and Spoken English across India.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop no-74, Mohite Patil Nagar, Mankhurd West",
      "addressLocality": "Mumbai",
      "postalCode": "400043",
      "addressCountry": "IN"
    },
    "telephone": "+91-816-997-6265",
    "email": "hello@levoraacademy.com",
    "sameAs": [
      "https://instagram.com/levoraacademy",
      "https://youtube.com/@levoraacademy",
      "https://facebook.com/levoraacademy"
    ]
  };
};

export const generateCourseSchema = (courseName, courseDescription) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": courseDescription,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Levora Academy",
      "url": "https://levoraacademy.vercel.app"
    }
  };
};

export const generateBreadcrumbSchema = (pageName, pageUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://levoraacademy.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": pageName, "item": pageUrl }
    ]
  };
};

export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What courses does Levora Academy offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer programs spanning School Foundation (Class 1-10), JEE & NEET prep, Python, Web Development, and Spoken English."
        }
      },
      {
        "@type": "Question",
        "name": "When do admissions open for the 2025–26 batch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Admissions are currently open for the 2025-26 academic session. Batches begin in April 2025."
        }
      },
      {
        "@type": "Question",
        "name": "Is there an entrance test to join Levora Academy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for our advanced JEE/NEET batches, we conduct an LEAT (Levora Entrance and Admission Test) to assess current proficiency and offer scholarships."
        }
      },
      {
        "@type": "Question",
        "name": "Does Levora Academy offer online classes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide full hybrid and online-only cohorts for students across India, featuring live interactive sessions."
        }
      },
      {
        "@type": "Question",
        "name": "What is the fee structure at Levora Academy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fees vary based on the grade and program. Our foundation courses start at ₹25,000/year, and premium JEE/NEET programs range from ₹80,000 to ₹1,20,000/year."
        }
      }
    ]
  };
};

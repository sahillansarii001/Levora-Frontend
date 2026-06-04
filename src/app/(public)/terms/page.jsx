import React from 'react';

export const metadata = {
  title: "Terms of Service | Levora Academy",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy mb-8 font-poppins">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            Welcome to Levora Academy. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on Levora Academy's website for personal, non-commercial transitory viewing only.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Disclaimer</h2>
          <p className="mb-4">
            The materials on Levora Academy's website are provided "as is". Levora Academy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>
        </div>
      </div>
    </div>
  );
}

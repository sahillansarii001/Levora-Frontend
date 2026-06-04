import React from 'react';

export const metadata = {
  title: "Privacy Policy | Levora Academy",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy mb-8 font-poppins">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            At Levora Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">How We Use Collected Information</h2>
          <p className="mb-4">
            Levora Academy may collect and use Users personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">To improve customer service</li>
            <li className="mb-2">To personalize user experience</li>
            <li className="mb-2">To send periodic emails regarding updates or service information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

export default function AdmissionsProcess({ title }) {
  const steps = [
    { step: "1", title: "Fill Form", desc: "Submit the online inquiry form." },
    { step: "2", title: "Counselling Call", desc: "Our academic counselor will guide you." },
    { step: "3", title: "Seat Confirmation", desc: "Complete registration and fee payment." },
    { step: "4", title: "Batch Starts", desc: "Attend orientation and begin classes." }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">{title || "Admission Process"}</h2>
      <div className="space-y-6">
        {steps.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-gold)] text-[var(--color-navy)] flex items-center justify-center font-bold text-sm">
              {item.step}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

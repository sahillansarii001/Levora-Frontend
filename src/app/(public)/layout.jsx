import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";


export const dynamic = 'force-dynamic';

async function getSettings() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings/public`, { 
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const json = await res.json();
    return json.data || {};
  } catch (err) {
    console.error('Failed to fetch settings', err);
    return {};
  }
}

export default async function PublicLayout({ children }) {
  const settings = await getSettings();

  if (settings.maintenanceMode) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-red-100">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Site Under Maintenance</h1>
              <p className="text-slate-500 mb-6">
                We are currently performing scheduled maintenance on our student portal. We will be back online shortly.
              </p>
              <a href="/login" className="text-sm font-semibold text-navy hover:text-gold transition-colors">
                Admin Login
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer settings={settings} />
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href={`tel:${settings?.contactPhone?.replace(/\s/g, '') || '+918169976265'}`} className="flex-1 bg-[var(--color-navy)] text-white text-center py-2.5 rounded-lg font-bold text-sm shadow-sm">
          Call Now
        </a>
        <a href="/admissions" className="flex-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-[var(--color-navy)] text-center py-2.5 rounded-lg font-bold text-sm shadow-sm">
          Enquire
        </a>
      </div>
    </>
  );
}

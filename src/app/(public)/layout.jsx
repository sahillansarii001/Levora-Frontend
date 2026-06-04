import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveReloader from "@/components/shared/LiveReloader";
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
            <LiveReloader />
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
      <LiveReloader />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveReloader from "@/components/shared/LiveReloader";

export default function PublicLayout({ children }) {
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

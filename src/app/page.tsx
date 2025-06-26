import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col bg-image"
    >
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}

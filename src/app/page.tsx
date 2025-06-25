import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/background.png')" }} // replace with your bg path
    >
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}

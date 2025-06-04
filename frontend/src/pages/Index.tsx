import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;

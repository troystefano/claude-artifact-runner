import React, { useState, useEffect } from 'react';
import { BookOpen, Shield, Users, Brain, Network, Globe, ChevronRight, ArrowRight, Library } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import {Spotlight} from "@/components/ui/spotlight"; // uncomment this line when component for using spotlight is integrated
import { PartnerCard } from './components/ui/PartnerCard';
import { SpotlightWrapper } from './components/ui/SpotlightWrapper';
import HeroTyping from './components/ui/hero-typing';



const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

 
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

    {/* Navigation */}
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">AIREN</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#mission">Mission</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#partners">Partners</NavLink>
              <button className="px-6 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      
      <Hero />
      
      {/* Features Section */}
      <div className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pioneering Ethical AI</h2>
            <p className="text-xl text-slate-600">Comprehensive frameworks for responsible innovation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Library className="w-8 h-8" />}
              title="Research Library"
              description="Access curated resources bridging ethical principles and practical implementation"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Ethical Framework"
              description="Guidelines rooted in Catholic social teaching and cutting-edge AI research"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Expert Community"
              description="Connect with leading researchers, practitioners, and ethicists"
            />
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="relative py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">St. Thomas University Institute for Ethical Leadership</h2>
            <p className="text-xl text-slate-600">Uniting academic excellenc and ethical leadership with technological innovation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-2">
              <PartnerCard
                title="St. Thomas University"
                description="Leading the advancement of Catholic-informed AI ethics through comprehensive research, innovative frameworks, and practical guidelines for human-centered technology development."
                primary={true}
              />
            </div>
            <PartnerCard
              title="Health Copilot AI"
              description="Mission-aligned strategic AI innovation partner, supporting technical innovation in ethical AI development, translating principles into practical implementation through advanced tools and methodologies."
              primary={false}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}

      <div className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Shape the Future of AI Ethics</h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Join us in building AI systems that promote human flourishing and serve the common good
          </p>
          <button className="px-8 py-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all">
            Get Involved
          </button>
        </div>
      </div>

      

      {/* Footer */}
        <footer className="relative py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-600">
            <p>© 2025 AIREN. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add required styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-gradient {
          animation: gradient 5s ease infinite;
        }

        .bg-300% {
          background-size: 300% 300%;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-slate-600 hover:text-slate-900 transition-colors relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all" />
  </a>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="group p-8 rounded-xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-200">
    <div className="w-16 h-16 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);


 {/* Partner Card */}

<PartnerCard/>


// const PartnerCard = ({ title, description, primary }) => (
//   <div className={`p-8 rounded-xl ${primary ? 'bg-slate-900 text-white' : 'bg-white'} hover:shadow-lg transition-all group border ${primary ? 'border-slate-800' : 'border-slate-200'}`}>
//     <h3 className={`text-2xl font-semibold mb-4 ${primary ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
//     <p className={`mb-6 ${primary ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
//     <a href="#" className={`flex items-center space-x-2 group ${primary ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}>
//       <span>Learn more</span>
//       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//     </a>
//   </div>
// );

export default LandingPage;
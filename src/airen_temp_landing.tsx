import React from 'react';
import { ChevronRight, BookOpen, Users, Shield, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-slate-800">AIREN</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
              <a href="#mission" className="text-slate-600 hover:text-slate-900 transition-colors">Mission</a>
              <a href="#partners" className="text-slate-600 hover:text-slate-900 transition-colors">Partners</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-fade-in">
              Artificial Intelligence Research & Ethics Network
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
              Advancing ethical AI development through Catholic social teaching and practical frameworks
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-delay-2">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-slate-800 transition-colors">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Research Synthesis</h3>
              <p className="text-slate-600">Comprehensive evidence library and practical tools for ethical AI development</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-slate-600">Fostering collaboration between researchers, practitioners, and stakeholders</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethical Framework</h3>
              <p className="text-slate-600">Developing comprehensive guidelines for AI that serves human flourishing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Strategic Partnership</h2>
            <p className="text-lg text-slate-600">A collaboration between leading institutions in ethical AI development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">St. Thomas University</h3>
              <p className="text-slate-600 mb-4">Leading voice in Catholic-informed AI ethics and human-centered technology development</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Health Copilot AI</h3>
              <p className="text-slate-600 mb-4">Innovative technical partner advancing practical tools and frameworks for ethical AI</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>© 2025 AIREN. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add the required styles for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
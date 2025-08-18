import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "wouter";

interface Stats {
  studentsEnrolled: number;
  coursesOffered: number;
  successRate: number;
}

export default function Hero() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
                Launch Your Career in 
                <span className="block text-yellow-300 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  Technology Training
                </span>
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-xl" data-testid="text-hero-description">
                Professional courses in <strong>Cybersecurity</strong>, <strong>Web Development</strong>, 
                and <strong>Network Infrastructure</strong>. Training in Lagos, Abuja, and online.
              </p>
            </div>

            {/* Key Info Banner */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">Apply Before</div>
                  <div className="text-lg">June 20, 2025</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">Next Start</div>
                  <div className="text-lg">June 27, 2025</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/application-form">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 text-primary hover:bg-yellow-300 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200"
                  data-testid="button-apply-now"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Apply Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                data-testid="button-download-brochure"
              >
                <i className="fas fa-download mr-2"></i>
                Download Brochure
              </Button>
            </div>

            {/* Course Delivery Info */}
            <div className="flex flex-wrap gap-6 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <i className="fas fa-chalkboard-teacher text-yellow-300"></i>
                <span>Classroom & Virtual</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-yellow-300"></i>
                <span>6 weeks duration</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-users text-yellow-300"></i>
                <span>9,999+ enrolled students</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="space-y-8">
            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <i className="fas fa-laptop-code text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold">Professional Training</h3>
                  <p className="text-lg opacity-90">Industry-Standard Curriculum</p>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-students">
                    {stats ? `${stats.studentsEnrolled.toLocaleString()}+` : '5,000+'}
                  </div>
                  <div className="text-sm text-gray-600">Students Trained</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold" data-testid="stat-success">
                    {stats ? `${stats.successRate}%` : '95%'}
                  </div>
                  <div className="text-sm opacity-90">Job Placement</div>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-white text-center">
                <div className="text-sm opacity-75 mb-1">Standard</div>
                <div className="text-2xl font-bold text-yellow-300">₦200,000</div>
                <div className="text-xs opacity-75">Virtual Only</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-white text-center">
                <div className="text-sm opacity-75 mb-1">Professional</div>
                <div className="text-2xl font-bold text-yellow-300">₦300,000</div>
                <div className="text-xs opacity-75">Classroom & Virtual</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

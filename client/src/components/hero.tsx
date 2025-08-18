import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      <div className="absolute inset-0 bg-white/80"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Professional training environment" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
                Launch Your <span className="talents-gradient">Tech Career</span> with Expert Training
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-hero-description">
                Master in-demand skills in Cybersecurity, Web Development, and Networking through hands-on training with industry experts. Join thousands who've transformed their careers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary"
                onClick={() => scrollToSection('courses')}
                data-testid="button-browse-courses"
              >
                <span>Browse Courses</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary"
                data-testid="button-download-brochure"
              >
                <Download className="mr-2 h-5 w-5" />
                <span>Download Brochure</span>
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-students">
                  {stats ? `${stats.studentsEnrolled.toLocaleString()}+` : '9,999+'}
                </div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary" data-testid="stat-courses">
                  {stats ? `${stats.coursesOffered}+` : '15+'}
                </div>
                <div className="text-sm text-gray-600">Courses Offered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-success">
                  {stats ? `${stats.successRate}%` : '95%'}
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Main Hero Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Cybersecurity training classroom" 
                className="w-full h-80 object-cover"
                data-testid="img-hero-classroom"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">Live Interactive Classes</h3>
                <p className="text-gray-600 mt-2">Experience hands-on learning with expert instructors and cutting-edge technology.</p>
              </div>
            </div>
            
            {/* Floating Certification Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 transform -rotate-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <i className="fas fa-certificate text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Industry Certified</div>
                  <div className="text-sm text-gray-600">Recognized Training</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

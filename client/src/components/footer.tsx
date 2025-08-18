import { GraduationCap } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold talents-gradient">TalentsHive</span>
            </div>
            <p className="text-gray-400">Empowering the next generation of tech professionals through world-class training and career development programs.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('courses')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-left"
                  data-testid="footer-nav-courses"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-left"
                  data-testid="footer-nav-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-left"
                  data-testid="footer-nav-testimonials"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-left"
                  data-testid="footer-nav-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  data-testid="footer-nav-career"
                >
                  Career Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Courses</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-course-cyber">Cybersecurity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-course-web">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-course-network">Network Infrastructure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-course-testing">Software Testing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-course-uiux">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <p data-testid="footer-address-lagos">122A Obadina Street<br />Omole Phase 1, Ikeja, Lagos</p>
              <p data-testid="footer-address-abuja">22 Kumasi Cres<br />Wuse 2, Abuja 904101, FCT</p>
              <p data-testid="footer-email">info@talentshive.org</p>
              <p data-testid="footer-phone">+234 904 551 8768</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400" data-testid="footer-copyright">&copy; 2024 TalentsHive. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-terms">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200" data-testid="footer-cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
